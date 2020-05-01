import * as path from "path";
import * as child from "child_process";
import * as core from "@actions/core";

const getSizeInput = (inputName: string, defaultValue?: number): number => {
    const inputValue = core.getInput(inputName, { required: !defaultValue });
    if (defaultValue && !inputValue) {
        return defaultValue;
    }

    let size = parseInt(inputValue);
    if (isNaN(size)) {
        throw new Error(`Unable to parse input '${inputName}'. Value '${inputValue}' is invalid.`)
    }

    // convert GB to Byte
    return size * 1024 * 1024 * 1024;
}

const run = (): void => {
    try {
        if (process.platform !== "win32") {
            throw new Error(`This task is intended only for Windows platform. It can't be run on '${process.platform}' platform`);
        }

        const minimumSize = getSizeInput("minimum-size");
        const maximumSize = getSizeInput("maximum-size", minimumSize);
        const diskRoot = core.getInput("disk-root", { required: true });

        core.info("Pagefile configuration:");
        core.info(`- Minimum size: ${minimumSize}`);
        core.info(`- Maximum size: ${maximumSize}`);
        core.info(`- Disk root: ${diskRoot}`);

        const scriptPath = path.resolve(path.join("..", "scripts", "SetPageFileSize.ps1"));
        const scriptArguments = [
            "-MinimumSize", `"${minimumSize}"`,
            "-MaximumSize", `"${maximumSize}"`,
            "-DiskRoot", `"${diskRoot}"`
        ].map(String);
        core.debug("Invoke configuration script:");
        core.debug(`Script path: ${scriptPath}`);
        core.debug(`Script arguments: ${scriptArguments}`)
        child.spawnSync("pwsh", ["-File", scriptPath, ...scriptArguments], {
            timeout: 60 * 1000,
            stdio: "inherit"
        });
    } catch (error) {
        core.setFailed(error.message);
    }
};

run();
