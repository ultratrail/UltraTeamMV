# Project description #

UltraTeamMV is a project developped by Enzo MOLION & Léo VALETTE during [Polytech Grenoble](https://www.polytech-grenoble.fr/)'s [RICM4](https://www.polytech-grenoble.fr/menu-principal/formations/reseaux-informatiques-et-communication-multimedia/) courses.

This project (2017-18 version of [UltraTeam](https://air.imag.fr/index.php/UltraTeam)) consists of :

- A BLE & LoRa decentralized protocol conception and implementation,
- A web application development.

This solution should allow a hikers team to localize each other in real time.
It is developed in synergy with another [UltraTeam 2018 project](https://air.imag.fr/index.php/RICM4_2017_2018_-_UltraTeam_7.1).

A more detailled description is available on the [AIR page](https://air.imag.fr/index.php/RICM4_2017_2018_-_UltraTeamMV) of the project.

# Installation
## User
### Android

- Download ```.apk``` file.  
- Browse to its location on your device file manager.  
- Click it. A standard installation prompt should allow you to install UltraTeamMV app.  

### Apple
Todo

### Windows phone
Todo

## Developper
### Develop Ionic app
You'll need to : install required commands (```git``` & ```npm```), clone repository and install required npm packages.  
You can do so by copy and pasting the following terminal commands if you're running a debian based linux distribution :

Install nmp via [nodejs](https://nodejs.org/en/download/) :  
```  
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -  
sudo apt-get install -y nodejs
```  
Install git :  
```
sudo apt install git  
```  
Clone repository :  
```  
git clone https://github.com/ultratrail/UltraTeamMV.git UltraTeamMVApp  
cd UltraTeamMVApp  
```  
Install required npm packages :  
```
sudo npm install
```  

You can now run the following command to emulate the application  
```
ionic -serve -c -lab
```
To help you understand this project, a documentation is provided. See `docs/index.html`.
### Install ESP-IDF software for BLE
First, you need to install this :
```
sudo apt-get install git wget make libncurses-dev flex bison gperf python python-serial
```

Then download the files needed [here](https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz)

Extract the files in a new folder "esp"
```
mkdir -p ~/esp
cd ~/esp
tar -xzf ~/Downloads/xtensa-esp32-elf-linux64-1.22.0-80-g6c4433a-5.2.0.tar.gz
```

Then clone the git repository :
```
cd ~/esp
git clone --recursive https://github.com/espressif/esp-idf.git
```

#### Start a project :
We will take the project ```hello_world``` as an example for the following commands
```
cd ~/esp
cp -r esp/examples/get-started/hello_world
```

Project configuration :
```
cd ~/esp/hello_world
make menuconfig
```

To flash your ESP32 card :
```
make flash
```

If you want to see the execution in your monitor do :
```
make monitor
```

To do both at teh same time you can also do
```
make flash monitor
```


### Known issues
See issues on repository.
