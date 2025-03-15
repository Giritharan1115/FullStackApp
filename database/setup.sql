CREATE DATABASE IF NOT EXISTS EventManagementDB;
USE EventManagementDB;

CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('User', 'Admin') NOT NULL DEFAULT 'User'
);

CREATE TABLE Events (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(200) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Date DATETIME NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    OrganizerId INT,
    FOREIGN KEY (OrganizerId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE RSVPs (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT,
    EventId INT,
    IsAttending BOOLEAN NOT NULL,
    AttendanceMinutes INT DEFAULT 0,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (EventId) REFERENCES Events(Id) ON DELETE CASCADE
);

INSERT INTO Users (Name, Email, PasswordHash, Role) 
VALUES ('Admin User', 'admin@admin.com', '$2a$11$Pjf2J9oiMZTIyCpoi4QSH.yAm/Vm/tAEu9AOI7j5NOKkj2/7yuvG6', 'Admin');
