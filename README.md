# RaspberryDonut

Raspberry Donut is a proof-of-concept project for manipulating live animations in the browser via hardware. The imagined application is for interactive projection art during live concerts or other entertainment events. 

![donut.gif](donut.gif)

### Background
Video projection art is an increasingly common component in live concerts. Most of the software used to create so-called "VJ sets" is expensive and complicated. Furthermore, it typically runs in software on a single machine, meaning that if the image is to be projected on multiple surfaces or devices, the signal must be split, adding an additional layer of setup and potential image degradation. The idea of Raspberry Donut is to create a simple DIY VJ setup with hardware controls that modulate premade graphics in intuitive ways. The values of each knob and sensor on the hardware is sent wirelessly to Azure cloud storage and then to a live web view, where inputs result in effects such as variable size, speed, and color of animations.

### What it's made of
Raspberry Donut consists of a hardware input interface and browser output. 

##### Hardware
Hardware inputs could be anything the user wishes; we experimented with **a temperature sensor**, **a color sensor**, and **a dial**. These are plugged in to a **Raspberry Pi 2 with Windows 10 IoT Core** running **a custom C# UWP**. Input data is sent wirelessly to **Azure Table Storage**. 

##### Web output
The 3D visuals in this sample were created with **p5.js**. The donut is a simple WebGL 3D primitive (toroid) with **a flat JPG texture** created in MS Paint. Values from Azure Table Storage are incorporated into the web view with the **Azure Storage node module** and the **socket.io node module**.
