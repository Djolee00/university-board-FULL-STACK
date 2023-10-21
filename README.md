
# University Board Management System

Welcome to the University Board Management System (UBMS) README! This comprehensive document will provide you with an in-depth understanding of the UBMS project, its purpose, use cases, and the technologies used to develop it.


## Project Overview

UBMS is a full-stack web application developed for a Bachelor's Thesis defense on Faculty of Organizational Sciences. The primary objective of this system is to streamline the management of university boards and facilitate efficient communication between university employees and board members. The application allows users to create, delete, modify, search, and sort boards. It also enables employees to upload comments and files to boards, with the added functionality of downloading those files.


## Craig Larman's Software Development Method

UBMS was developed following Craig Larman's software development method, which emphasizes an iterative and incremental approach to software development. My software development went through 5 phases:

    1. Requirements Gathering
    2. Analysis
    3. System Design
    4. Implementation
    5. Testing



## Requirements Gathering

Thoroughly understanding the requirements for the university board management system. I managed to identify 18 use cases and diveded them in 4 groups:

    1. Board administration
    2. Employee management
    3. File management
    4. Comments section

Also I realized that users should have different privileges and roles (group of privileges) so different sections and actions can be enabled/disabled for different users. 
For thesis writing purpose, I analized in detail 10 of 18 Use Cases, although in application all Use Cases were implemented in the end. Below is UML Case Diagram for my project:

![Screenshot_1](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/d4ff4031-cbd5-4d41-b88b-4b99fe1a3465)




## Analysis

For every Use Case defined in previous phase, in Analysis I defined UML Sequence Diagram which describes interaction between System and User. Here is an example of one Sequence Diagram:

![Screenshot_1](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/d488b5c7-61cb-4f2d-bf2d-a9ec44537828)

As a result of this phase I got description of the structure and behavior of the software system. Structure is described using UML Class Diagram and behaviour using list of system operations:

![Screenshot_2](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/a0ee894a-050a-4a3c-9f88-bc725d58f606)

## System Design
In Design phase I worked on details about previously defined System Operations through UML Sequence Diagrams.In addition, the design of screen forms and user interaction with them was carried out too. As result of this phase we get the final architecture of the software system:

![Picture1](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/550edb32-7f6a-4d08-ae34-04f5c550782b)

As we can see there are 3 layers of system. **UI** layer is an client application made primarily using React library. **Application logic** layer consists of 2 **Web Services** made using Spring framework. One web service is main who is responsible for almost whole business logic and also there is **file service** which is made for only file management. It is responsible for downloading, uploading and deleting files to/from **AWS S3** service. This service can be use for any other project which needs file management system and storage. **Storage layer** is implemented using **MySQL RDMS** and **Amazon S3**
## Implementation
In this phase, my task was to choose techonologies and implement everything till now was specified in previouse phases.

**Frontend techonologies**:

- Typescript
- React
- Axios
- Material UI (MUI)

**Backend techonologies**:

- Java 18
- Spring Boot 3
- Spring Security 6
- MySQL
- Amazon AWS S3

**Notable libraries and plugins**:

- Spring WebFlux
- Lombok
- Mapstruct
- Maven spotless plugin
- Hibernate JPA Metamodel Generator
- Thymeleaf
- JWT
- JavaMailSender
- Amazon SDK S3
## Testing

In this study example, manual testing of all use cases was performed, during which the behavior of the software and its response were monitored. Testing included validation of all possible data and their permitted values. By entering the correct and incorrect data values, the validation and operation of the software was checked, and during the testing, all the errors and deficiencies that were discovered were incrementally removed. 
Testing also included checking the safety and security of the software system itself, that is, its resources depending on the users themselves and their privileges.
## Screenshots

![Picture9](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/98ff5d51-1772-4715-9a45-71d47518bd89)
![1](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/0cb23fb4-251c-4bda-9a2b-9d71f7892032)
![2](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/b7858c05-9b41-48e3-9f7d-c2bc132222fc)
![3](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/0145ee47-c90c-4a93-bc50-ab617cbc8209)
![4](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/c3f9cf1f-f4d2-4634-9f11-d302c210ba3b)
![5](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/ec54780e-1f78-4111-9230-680bce4c0363)
![Picture6](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/1c64f949-5cd6-4f70-9f9b-46b8567e13aa)
![Picture8](https://github.com/Djolee00/university-board-FULL-STACK/assets/93478227/ed945e7b-5ddf-46b0-bce4-7c88609961fd)

## Future Improvements

- Dockerization
- Unit and Integration testing
- Implementing Microservice architecture
- Hosting whole system
- API and User documentation
