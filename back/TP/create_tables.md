```sql
create database tp;
use tp;

CREATE TABLE PUser(
							userName								VARCHAR(100) PRIMARY KEY,
							nickName								VARCHAR(100),
							passWD									VARCHAR(256),
							portrait      							VARCHAR(256)//上传的头像文件的拓展名，如.jpg
);


CREATE TABLE Teacher (
							id 										char(10) PRIMARY KEY,
							userName								VARCHAR(100),
							firstName   							VARCHAR(50),
							lastName 								VARCHAR(50),
							department 								VARCHAR(100),
							email 									VARCHAR(50),
							FOREIGN KEY (userName) REFERENCES PUser(userName)
);


CREATE TABLE Student(
							id 										char(10) PRIMARY KEY,
							userName 								VARCHAR(100),
							major 									varchar(100),
							email 									VARCHAR(100),
							FOREIGN KEY(userName) REFERENCES PUser(userName)
);

CREATE TABLE TA (
							user	Name  								VARCHAR(100) ,
							teacherId								char(10) not NULL,
							courseDescriptor    					VARCHAR(256),
							PRIMARY KEY(userName,courseDescriptor),
							FOREIGN KEY(userName) REFERENCES puser(userName),
							FOREIGN KEY (courseDescriptor) REFERENCES course(courseDescriptor),
							FOREIGN KEY (teacher) REFERENCES teacher(id)
);

CREATE TABLE Course(
							courseDescriptor 						VARCHAR(256) PRIMARY KEY,
    						//将上这门课的老师的userName+courseId+startTime拼接在一起，然后sha256
							courseId 								char(20) NOT NULL,
							credit 									NUMERIC(3,1) NOT NULL,
							semester 								char(10) NOT NULL,
							startTime 								DATE NOT NULL,
							endTime 								DATE NOT NULL,
							courseStart 							TIME NOT NULL,
							courseEnd 								TIME NOT NULL,
							hotIndex 								INT,
							Image 									VARCHAR(256),//数据库里存的是上传头像文件的拓展名，如.jpg
							description 							VARCHAR(1000)
);

CREATE TABLE Manage(
							userName 							 	VARCHAR(100) ,
							courseDescriptor 						VARCHAR(256) ,
							type 									bit(1),#0 for TA and 1 for Instructor
							newNotice 								bit(1),#0 for no rights, 1 otherwise
							editNotice 								bit(1),#0 for no rights, 1 otherwise
							deleteNotice 							bit(1),#0 for no rights, 1 otherwise
							newHomework 							bit(1),#0 for no rights, 1 otherwise
							editHomework 							bit(1),#0 for no rights, 1 otherwise
							deleteHomework 							bit(1),#0 for no rights, 1 otherwise
							gradeHomework 							bit(1),#0 for no rights, 1 otherwise
							FOREIGN KEY(userName) REFERENCES PUser(userName),
						    FOREIGN KEY(courseDescriptor) REFERENCES Course(courseDescriptor),
							PRIMARY KEY(userName,courseDescriptor)
);

CREATE TABLE Homework(
							courseDescriptor						VARCHAR(256) ,
							homeworkTitle 							VARCHAR(100) ,
							startTime 								DATETIME NOT NULL,
							endTime 								DATETIME NOT NULL,
							taskDescription 						VARCHAR(5000),
						    creatorUsername							VARCHAR(100) ,
							FOREIGN KEY (courseDescriptor) REFERENCES Course(courseDescriptor),
						    FOREIGN KEY (creatorUsername) REFERENCES PUser(userName),
							PRIMARY KEY (courseDescriptor,homeworkTitle,creatorUsername)
);

CREATE TABLE Participation (
							studentUserName 						VARCHAR(100),
							courseDescriptor 						VARCHAR(256),
							finalGrade 								NUMERIC(5,2),
							signInTime 								DATETIME,
							PRIMARY KEY (studentUserName,courseDescriptor),
							FOREIGN KEY (studentUserName) REFERENCES Puser(userName),
							FOREIGN KEY (courseDescriptor) REFERENCES Course(courseDescriptor)
);

CREATE TABLE HandInHomework(
							submitUserName							VARCHAR(100),
							gradeUserName 							VARCHAR(100),
							grades 									NUMERIC(5,2),
							handInTime 								DATETIME,
						    fileName								VARCHAR(256) NOT NULL,
    						//数据库中存的是上传的文件名
							file 									VARCHAR(256) NOT NULL,
    						//对于file，数据库里存的是submitUserName+fileName+handInTime拼接在一起，然后sha256
							courseDescriptor 						VARCHAR(256),
							homeworkTitle 							VARCHAR(100),
							PRIMARY KEY (submitUserName,handInTime),
							FOREIGN KEY (submitUserName) REFERENCES Student(userName),
						    FOREIGN KEY (gradeUserName) REFERENCES Manage(userName),
							FOREIGN KEY (courseDescriptor,homeworkTitle) REFERENCES Homework(courseDescriptor,homeworkTitle)							
);

CREATE TABLE Reference (
							referenceName 							varchar(256),
        					//数据库中存的是上传的文件名
						    file									VARCHAR(256),
    						//对于file，数据库里存的是referenceName+uploadTime+courseDescritor拼接在一起，然后sha256
							uploadTime 								DATETIME,
							downloadable 							bit(1),#0 for disabled
							courseDescriptor 						VARCHAR(256),
							PRIMARY KEY(referenceName,uploadTime),
							FOREIGN KEY(courseDescriptor) REFERENCES Course(courseDescriptor)
);


CREATE TABLE Notification (
							content 								VARCHAR(1000),
							createTime								DATETIME,
							creatorUsername 						VARCHAR(100),
							courseDescriptor 						VARCHAR(256),
							PRIMARY KEY (creatorUsername,courseDescriptor,time),
							FOREIGN KEY (courseDescriptor) REFERENCES course(courseDescriptor),
							FOREIGN KEY (creatorUsername) REFERENCES manage(userName)
);

CREATE TABLE Complain (
							studentUsername 						VARCHAR(100),
							courseDescriptor 						VARCHAR(256),
							handInTime 								DATETIME,
							reason 									VARCHAR(1000),
							PRIMARY KEY (studentUsername, handInTime),
							FOREIGN KEY (studentUsername,handInTime) REFERENCES handinhomework(submitUserName,handInTime)
);
```