using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Net.Http;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;
using Windows.Devices.Gpio;
using Windows.UI.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;
using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.Devices.Gpio;
using Windows.Devices.Spi;
using Windows.Devices.Enumeration;
using Microsoft.Azure.Devices.Client;
using Newtonsoft.Json;



// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace Lesson_203V2
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
      // DeviceClient client = DeviceClient.CreateFromConnectionString("HostName=GabbyPiHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=UjvWEmpOi+BjqyhXtOWXUrTtagMstNN1UfjkxdXxhp0=");
        //A class which wraps the barometric sensor
        BME280Sensor BME280;
        //A class which wraps the color sensor
        Lesson_205.TCS34725 colorSensor;
    
        // Use for configuration of the MCP3008 class voltage formula
        const float ReferenceVoltage = 5.0F;

        // Values for which channels we will be using from the ADC chip
        const byte LowPotentiometerADCChannel = 0;
        const byte HighPotentiometerADCChannel = 1;
        const byte CDSADCChannel = 2;

        int lowPotReadVal;
        float temp = 0;
        string colorRead;
        int colorNum;
        int Row = 0;

        Lesson_204.MCP3008 mcp3008 = new Lesson_204.MCP3008(ReferenceVoltage);



        public MainPage()
        {
            this.InitializeComponent();
        }

        // This method will be called by the application framework when the page is first loaded
        protected override async void OnNavigatedTo(NavigationEventArgs navArgs)
        {
            Debug.WriteLine("MainPage::OnNavigatedTo");
            /* Now that everything is initialized, create a timer so we read data every 500mS */
            // int periodicTimer = new Timer(this.Timer_Tick, null, 0, 100);

         

            try
            {
                // Create a new object for our sensor class
                BME280 = new BME280Sensor();
                //Initialize the sensor
                await BME280.Initialize();

                //Create a new object for the color sensor class
                colorSensor = new Lesson_205.TCS34725();
                //Initialize the sensor
                await colorSensor.Initialize();
                //Initialize mcp3008 to get potentimeter values
                mcp3008.Initialize();



                //Create variables to store the sensor data: temperature, pressure, humidity and altitude. 
                //Initialize them to 0.
                
              
           

                //Read 10 samples of the data
                for (int i = 0; i < 12; i++)
                {
                    temp = await BME280.ReadTemperature();
                    colorRead = await colorSensor.getClosestColor();
                    int lowPotReadVal = mcp3008.ReadADC(LowPotentiometerADCChannel)/100;

                    switch (colorRead)
                    {
                        case "Red": 
                            colorNum = 0;
                            break;
                        case "Purple":
                            colorNum = 1;
                            break;
                        case "Blue":
                            colorNum = 2;
                            break;
                        case "DarkSlateBlue":
                            colorNum = 3;
                            break;
                        case "Green":
                            colorNum = 4;
                            break;
                        case "Yellow":
                            colorNum = 5;
                            break;
                        default: 
                            colorNum = 6;
                            break;

                      
                    }

                    // Let us know what was read in.
                    Debug.WriteLine(String.Format("Read values {0}", lowPotReadVal));
                    //Write the values to your debug console
                    Debug.WriteLine("Temperature: " + temp.ToString() + " deg C");
                    Debug.WriteLine("Color: " + colorNum.ToString() + " %");
                  
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }



   /*     public async Task SendMessageAsync()
        {
            var dm = new
            {
                DeviceID = "GabbyPi",
                PartitionKey = "AAA",
                RowKey = Row++,
                Potentiometer = lowPotReadVal,
                Temperature = temp,
                RGB = colorNum
            };
            var serializedMessage = JsonConvert.SerializeObject(dm);
            //Debug.WriteLine("Sending message " + serializedMessage);
            var message = new Message(Encoding.UTF8.GetBytes(serializedMessage));
            await client.SendEventAsync(message);
            Debug.WriteLine("Message sent.");
        }*/


    }
}
