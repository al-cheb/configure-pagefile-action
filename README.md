# configure-pagefile-action
This action is intended to configure Pagefile size and location for Windows images in GitHub Actions.  

# Available parameters
| Argument                | Description              | Default value      |
|-------------------------|--------------------------|--------------------|
| `minimum-size`          | Set minimum size of Pagefile (GB) | `8` |
| `maximum-size`          | Set maximum size of Pagefile (GB) | `minimum-size` |
| `disk-root`          | Set disk root where Pagefile will be located | `C:`, `D:` |

# Usage
```
name: CI
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
    - name: configure Pagefile
      uses: al-cheb/configure-pagefile-action@v1.0
      with:
        minimum-size: 8

    - name: configure Pagefile
      uses: al-cheb/configure-pagefile-action@v1.0
      with:
        minimum-size: 8
        maximum-size: 16
        disk-root: "D:"
```

# License
The scripts and documentation in this project are released under the [MIT License](LICENSE)