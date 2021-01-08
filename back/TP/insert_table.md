```sql
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('CAIcy', '灿宝宝', 'caobao123', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('HUyf', '船笛', 'chuandi123', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('LIsi', 'LI', 'li456', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('LIsir', 'LI', 'li123', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('LIUxm', '小米', '123456', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('LOUsir', 'LOU', 'lou123', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('SHENsir', 'SHEN', 'shen123', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('WANGwu', 'WANG', 'wang456', 'jpg');
INSERT INTO `tp`.`puser`(`userName`, `nickName`, `passWD`, `portrait`) VALUES ('ZHANGsan', 'ZHANG', 'zhang456', 'jpg');


INSERT INTO `tp`.`teacher`(`id`, `userName`, `firstName`, `lastName`, `department`, `email`) VALUES ('2160101111', 'LOUsir', '学庆', '楼', '计算机科学与技术学院', '2180101111@zju.edu.cn');
INSERT INTO `tp`.`teacher`(`id`, `userName`, `firstName`, `lastName`, `department`, `email`) VALUES ('2170102222', 'LIsir', '将云', '李', '数学科学学院', '2170102222@zju.edu.cn');
INSERT INTO `tp`.`teacher`(`id`, `userName`, `firstName`, `lastName`, `department`, `email`) VALUES ('2180103333', 'SHENsir', '志坤', '沈', '光华法学院', '2180103333@zju.edu.cn');


INSERT INTO `tp`.`student`(`id`, `userName`, `major`, `email`) VALUES ('3180101972', 'CAIcy', '数学', '1078273927@qq.com');
INSERT INTO `tp`.`student`(`id`, `userName`, `major`, `email`) VALUES ('3180103167', 'HUyf', '法学', '3180103167@zju.edu.cn');
INSERT INTO `tp`.`student`(`id`, `userName`, `major`, `email`) VALUES ('3180106071', 'LIUxm', '软件工程', 'l.bruyne1008@foxmail.com');

INSERT INTO `tp`.`course`(`courseDescriptor`, `courseName`, `courseId`, `credit`, `semester`, `startTime`, `endTime`, `courseStart`, `courseEnd`, `hotIndex`, `Image`, `description`) VALUES ('589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', '计算机系统原理', '1160107777', 4.0, '秋冬学期', '2020-09-16', '2020-01-16', '09:50:00', '11:25:00', 5, 'jpg', '这是计算机系统原理课程');
INSERT INTO `tp`.`course`(`courseDescriptor`, `courseName`, `courseId`, `credit`, `semester`, `startTime`, `endTime`, `courseStart`, `courseEnd`, `hotIndex`, `Image`, `description`) VALUES ('b1bf657ea7c51a265825d020890cce783e8ffa414e4cc11b77e57286f237e8c7', '经济法概论', '1180109999', 2.5, '冬学期', '2019-11-12', '2020-01-12', '18:30:00', '21:05:00', 7, 'jpg', '这是经济法概论课程');
INSERT INTO `tp`.`course`(`courseDescriptor`, `courseName`, `courseId`, `credit`, `semester`, `startTime`, `endTime`, `courseStart`, `courseEnd`, `hotIndex`, `Image`, `description`) VALUES ('b511a2ad3dbab9e1ba0213e6416800598c67790008a92366831a087a84f67e21', '线性代数', '1170108888', 3.0, '春夏学期', '2020-03-14', '2020-06-14', '13:15:00', '15:40:00', 4, 'jpg', '这是线性代数课程');



INSERT INTO `tp`.`ta`(`userName`, `teacherId`, `courseDescriptor`) VALUES ('ZHANGsan', '2160101111', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7');



INSERT INTO `tp`.`reference`(`referenceName`, `file`, `upLoadTime`, `downloadable`, `courseDescriptor`) VALUES ('JAVA learning.pptx', '0493f3740c839681f32ef8a540f521d0545b2579a993e6f111d277202f2d1c42', '2020-09-30 10:30:00', b'1', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7');


INSERT INTO `tp`.`manage`(`userName`, `courseDescriptor`, `type`, `newNotice`, `editNotice`, `deleteNotice`, `newHomework`, `editHomework`, `deleteHomework`, `gradeHomework`) VALUES ('LOUsir', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1');
INSERT INTO `tp`.`manage`(`userName`, `courseDescriptor`, `type`, `newNotice`, `editNotice`, `deleteNotice`, `newHomework`, `editHomework`, `deleteHomework`, `gradeHomework`) VALUES ('ZHANGsan', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', b'0', b'1', b'1', b'0', b'0', b'0', b'0', b'1');


INSERT INTO `tp`.`complain`(`studentUsername`, `courseDescriptor`, `handInTime`, `reason`) VALUES ('LIUxm', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', '2020-10-20 13:26:00', '老师您好，请问为何我的作业扣分很多？具体扣分点在哪？');


INSERT INTO `tp`.`homework`(`courseDescriptor`, `homeworkTitle`, `homeworkContent`, `startTime`, `creatorUsername`, `endTime`) VALUES ('589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', '自学实现一个编译器', '这是我们课程的第一个作业，请大家认真完成，提交格式为pdf的报告形式', '2020-10-10 11:25:00', 'LOUsir', '2020-11-10 23:59:59');


INSERT INTO `tp`.`handinhomework`(`submitUserName`, `gradeUserName`, `grades`, `handInTime`, `fileName`, `file`, `courseDescriptor`, `homeworkTitle`) VALUES ('LIUxm', 'ZHANGsan', 88.50, '2020-10-20 13:26:00', '3180106071hw1.pptx', 'a5b1b755bc74e58bcd6c768e117b1a36632f89350c31c23b52c0a0db05baf6c1', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', '自学实现一个编译器');

INSERT INTO `tp`.`notification`(`content`, `createTime`, `creatorUsername`, `courseDescriptor`) VALUES ('大家注意要按时交作业！', '2020-11-01 15:39:00', 'ZHANGsan', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7');

INSERT INTO `tp`.`participation`(`studentUsername`, `courseDescriptor`, `finalGrade`, `signInTime`) VALUES ('CAIcy', 'b511a2ad3dbab9e1ba0213e6416800598c67790008a92366831a087a84f67e21', 4.80, '2020-12-20 18:24:00');
INSERT INTO `tp`.`participation`(`studentUsername`, `courseDescriptor`, `finalGrade`, `signInTime`) VALUES ('HUyf', 'b1bf657ea7c51a265825d020890cce783e8ffa414e4cc11b77e57286f237e8c7', 4.20, '2019-09-01 23:23:00');
INSERT INTO `tp`.`participation`(`studentUsername`, `courseDescriptor`, `finalGrade`, `signInTime`) VALUES ('LIUxm', '589b51e8b8790cb67fb0245edb9b03fdcce0c81265e46d945ddf743eb22003d7', 3.30, '2020-09-11 13:15:00');

```

