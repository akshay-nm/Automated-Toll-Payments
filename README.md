# Automated-Toll-Payments(ATP)

ATP is an application based on object detection, OCR, Payment gateway and link-generation

- Input  = Image from a Camera showing vehicle and its license plate
- Output = License Plate detection, performing optical character recognition (OCR) on License plate, cross check the license plate number with the database of license plate, generate a payment link and notify the user.

## Tasks

<table>
  <thead>
    <tr>
      <th>T.Code</th>
      <th>Task Description</th>
      <th>Performed by</th>
      <th colspan=6>API used</th>
    </tr>
    <tr>
      <th colspan=3></th>
      <th>name</th>
      <th>endpoint description</th>
      <th>path</th>
      <th>header</th>
      <th>method</th>
      <th>query</th>
      <th>body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A01</td>
      <td>Add a new vehicle</td>
      <td>Admin</td>
      <td>atp-vehicles-api</td>
      <td>CREATE VEHICLE DATA</td>
      <td>/vehicles</td>
      <td>Content-Type: application/json</td>
      <td>POST</td>
      <td>-</td>
      <td>createVehicleBody</td>
    </tr>
    <tr>
      <td>A02</td>
      <td>Update vehicle status: blacklist | exempt | normal</td>
      <td>Admin</td>
      <td>atp-vehicles-api</td>
      <td>UPDATE VEHICLE DATA</td>
      <td>/vehicles</td>
      <td>Content-Type: application/json</td>
      <td>PUT</td>
      <td>updateVehicleQuery</td>
      <td>-</td>
    </tr>
    <tr>
      <td>A03</td>
      <td>Cancel a pending transaction</td>
      <td>Admin</td>
      <td>atp-transactions-api</td>
      <td>UPDATE TRANSACTION DATA</td>
      <td>/transactions</td>
      <td>Content-Type: application/json</td>
      <td>PUT</td>
      <td>updateTransactionQuery</td>
      <td>-</td>
    </tr>
    <tr>
      <td>U01</td>
      <td>Pay pending fee</td>
      <td>User</td>
      <td>atp-transactions-api</td>
      <td>COMPLETE PENDING TRANSACTION</td>
      <td>/pay</td>
      <td>Content-Type: application/json</td>
      <td>POST</td>
      <td>-</td>
      <td>payBody</td>
    </tr>
    <tr>
      <td>U02</td>
      <td>Report Suspicious Activity with reason for own vehicle</td>
      <td>User</td>
      <td>atp-sar-api</td>
      <td>CREATE SUSPICIOUS ACTIVITY REPORT</td>
      <td>/</td>
      <td>Content-Type: application/json</td>
      <td>POST</td>
      <td>-</td>
      <td>createSarBody</td>
    </tr>
    <tr>
      <td>U03</td>
      <td>Close Suspicious Activity with reason for own vehicle</td>
      <td>User</td>
      <td>atp-sar-api</td>
      <td>UPDATE SUSPICIOUS ACTIVITY REPORT</td>
      <td>/</td>
      <td>Content-Type: application/json</td>
      <td>PUT</td>
      <td>createSarQuery</td>
      <td>-</td>
    </tr>
    <tr>
      <td>S01</td>
      <td>Identify vehicle</td>
      <td>System</td>
      <td>atp-vehicles-api</td>
      <td>READ VEHICLE DATA</td>
      <td>/vehicles</td>
      <td>Content-Type: application/json</td>
      <td>GET</td>
      <td>readVehicleQuery</td>
      <td>-</td>
    </tr>
    <tr>
      <td>S02</td>
      <td>Create and send Payment link to the user</td>
      <td>System</td>
      <td>atp-vehicles-api</td>
      <td>READ VEHICLE TOLL RATE DATA</td>
      <td>/rates</td>
      <td>Content-Type: application/json</td>
      <td>GET</td>
      <td>readVehicleTollRatesQuery</td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan=3></td>
      <td>atp-transactions-api</td>
      <td>CREATE TRANSACTION</td>
      <td>/</td>
      <td>Content-Type: application/json</td>
      <td>GET</td>
      <td>-</td>
      <td>createTransactionBody</td>
    </tr>
    <tr>
      <td>S03</td>
      <td>Accept payment for pending transaction</td>
      <td>System</td>
      <td>atp-transactions-api</td>
      <td>UDPATE TRANSACTION DATA</td>
      <td>/</td>
      <td>Content-Type: application/json</td>
      <td>PUT</td>
      <td>updateTransactionQuery</td>
      <td>-</td>
    </tr>
  
  </tbody>
</table>

## Additional Tasks

- displaying a message for the vehicle on a signboard incase of pending payment (pending payments)
- notifying authorities incase of a blacklisted/unregistered vehicle
- notifying authorities incase of a suspicious activity
- geofencing

## Parts of system:          

### Vehicle Identification

- Importing raw video from the camera as soon as a vehicle has appeared in it.
- Running it through openCV to detect the license plate.
- Extracting the license plate frame.
- Detecting the license plate and running it through tesseract to obtain the license plate number.

### Admin Panel

This is a dashboard for monitoring the state of system.
- Number of blacklisted vehicles
- Number of expemtped vehicles
- Current vehicles with pending payments
- Last spotting of balcklisted vehicles
- revenue charts
- unregistered vehicle spotting

### Payment links
These are generated when a registered vehicle passes through the toll booth. Forwarded to the client via SMS/ in-app notifications

### Payments page
These are pages which facilitate payment against pending charges. 

## Network Nodes

- API Servers
  - booths
  - sar
  - transactions
  - vehicles
- Payment Client
- Admin Client
- Database

                    
## Payment Link Requirements

### Saved Data
RC number
Name of the Vehicle Owner
Toll booth ID
Toll value according to vehicle type
        
### Required Data
Time of Passage of Vehicle
License Plate Number
Type of Vehicle
Username
          
         
