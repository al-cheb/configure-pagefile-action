import * as path from "path";
import * as child from "child_process";
import * as core from "@actions/core";

const run = (): void => {
    try {
        if (process.platform !== "win32") {
            throw new Error(`This task is intended only for Windows platform. It can't be run on '${process.platform}' platform`);
        }

        const minimumSize = core.getInput("minimum-size", { required: true });
        const maximumSize = core.getInput("maximum-size", { required: false }) || minimumSize;
        const diskRoot = core.getInput("disk-root", { required: true });
        const timeout = parseInt(core.getInput("timeout", { required: true })) * 1000;

        core.info("Pagefile configuration:");
        core.info(`- Minimum size: ${minimumSize}`);
        core.info(`- Maximum size: ${maximumSize}`);
        core.info(`- Disk root: ${diskRoot}`);

        const scriptPath = path.resolve(__dirname, "..", "scripts", "SetPageFileSize.ps1");
        const scriptArguments = [
            "-MinimumSize", minimumSize,
            "-MaximumSize", maximumSize,
            "-DiskRoot", diskRoot
        ];
        core.debug("Invoke configuration script:");
        core.debug(`Script path: ${scriptPath}`);
        core.debug(`Script arguments: ${scriptArguments}`);

        const scriptResult = child.spawnSync("powershell", [scriptPath, ...scriptArguments], {
            timeout
        });
        if (scriptResult.stdout) { core.info(scriptResult.stdout.toString()); }
        if (scriptResult.stderr) { core.error(scriptResult.stderr.toString()); }
        if (scriptResult.status !== 0) { throw new Error(`Script has finished with exit code '${scriptResult.status}'`) }
    } catch (error) {
        core.setFailed(error.message);
    }
};

run();
