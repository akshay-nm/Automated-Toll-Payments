# Automated-Toll-Payments(ATP)

** URL for admin client: [https://atp-admin-client.web.app](https://atp-admin-client.web.app/login) **

** URL for vehicle owner client: [https://atp-vehicle-owner-client.web.app](https://atp-vehicle-owner-client.web.app/login) **

## Some insights

When making roads, the government doesn't always pay the contractors in full. Instead the government lets the contractors charge 
a toll from the road users for a particular timeperiod. The toll values are fixed by the government (revised each year). A contractor might have contracts
of more than one stretch of road, and hence more than one toll `checkposts`. A toll `checkpost` can have multiple toll `booths`. Each toll booth needs to be configured before it can be used. Since each toll `booth` uses a `camera`, the system needs to be told about it. Once the camera has been configured, the system needs information about the toll `checkpost` so that all the `transactions` can be linked to it. 
The toll booth's job is to identify the `vehicle` using the `camera` and begin the `transaction` generation process.

Each `transaction` should contain enough information to uniquely identify the toll `checkpost`, the `contractor` and the `vehicle owner`. Once the transaction has been created, both parties are informed about it. 
To avoid misuse, the vehicles have to be `registered` into the system. Incase of an `unregistered` vehicle, the system will not allow the vehicle to pass and will also notify `authorities`.
Using this system, the `contractor` and the `authorities` can monitor all the toll `checkposts`. The `vehicle owners` can monitor their `expenses` and `vehicles`. This project has been designed as a **realtime** system. 

## Components

- Admin client
- User client
- Booth client
- Transaction server

### Admin client

- Register as an administrator
- Update profile
- Add a toll
- View all tolls
- Update toll status
- Remove a toll
- View Transactions per toll
- View all transacions

### User client

- Login with OTP
- Monitor Vehicles
- Update contact details
- View toll transaction history
- View pending toll transactions
- Pay for a pending toll transaction
- Raise suspicious activity

### Booth client

- Login using admin credentials
- Create a booth configuration (Select camera)
- Select a toll to add the configured booth to.

### Pass cloud function

- Args: `vehicleRc`, `checkpostId`, `timestamp`
- if request authenticated and args valid 
  - create a pass event
  - if the vehicle is normal or exempted
    - create the transaction event
  - else 
    - create the blacklisted vehicle event
  - return 
- else
  - if authorization error
    - create unauthorized request event
  - if validation error
    - create bad request event
  - if any other error
    - create unknown error event 

- Send notifications to users on successful transacion creation

## The Process: 

### Creating a transaction

1. A bot reads the RC number from video feed and sends a request to create apt transaction. 
2. The server-side then checks the vehicles database for existing records matching the rc provided by the bot. It also checks the booths data base for existing records matching boothId provided by the bot.
3. On successful match, the server creates a transaction between the booth and the vehicle owner. The server sends the payment link to the user. The server then responds to the bot with the transactionId.

* Whenever a new vehicle passes, the vehicle details are displayed on the screen. If the vehicle is blacklisted, the booth boom will close. The admin can then choose how to handle the case.

### Accepting payment

1. The user goes to the payment page and enters credentials. (Click on pay button).
2. The server then updates the transaction status as complete.

### Generating receipts

1. The user clicks on generate receipt.
2. The server sends a JSON file with transaction details.

### Reporting suspicious activity

1. The user receives a notification about a pending transaction. 
2. The user then selects report suspicious activity.
3. The server then updates the vehicle status as blacklisted.

                    
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
