# configure-pagefile-action
This action is intended to configure Pagefile size and location for Windows images in GitHub Actions.  

# Available parameters
| Argument | Description | Format | Default value |
|----------|-------------|--------|---------------|
| `minimum-size` | Set minimum size of Pagefile | `2048MB`, `4GB`, `8GB` and etc. | `8GB` |
| `maximum-size`          | Set maximum size of Pagefile | The same like `minimum-size` | `minimum-size` |
| `disk-root`          | Set disk root where Pagefile will be located | `C:` or `D:` | `D:` |

# Usage
```
name: CI
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
    - name: configure Pagefile
      uses: al-cheb/configure-pagefile-action@v1.2
      with:
        minimum-size: 8GB
        maximum-size: 16GB
        disk-root: "D:"
```

# License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
