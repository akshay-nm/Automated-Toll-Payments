# Automated-Toll-Payments(ATP)

ATP is an application based on object detection, OCR, Payment gateway and link-generation

          Input  = Image from a Camera showing vehicle and its license plate
          Output = License Plate detection, performing optical character recognition (OCR) on License plate, cross check the license plate number with the database of license plate, generate a payment link and notify the user.

# Tasks

          - Importing raw video from the camera as soon as a vehicle has appeared in it.
          - Running it through openCV to detect the license plate.
          - Extracting the license plate frame.
          - Detecting the license plate and running it through tesseract to obtain the license plate number.
          - Cross referencing the license plate number with the provided database.
          - Generating a payment link & notifying user, if the current license plate number is found in the database.
          
# Nodes 
          
          # Camera
                    providing image of the vehicle.
                   
          # PC 
                    object detection, optical character recognition, link generation.
                    
          # Phone
                    getting notified for payment.
                    
 # Payment Link Requirements
          - Time of Passage of vehicle.
          - License Number on the vehicle.
          - User name.
          - location of toll usage.
