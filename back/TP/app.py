from flask import Flask, request, make_response, send_from_directory, url_for
from Classes import Base, Engine, select, PUser, Teacher, Student, Course, Manage, Homework, HandInHomework, Reference, \
    HandInHomework, session, TA, MyJSONEncoder, courseDescriptor2Name
import json

from flask import render_template

filePath = './static'
app = Flask(__name__)


# app.debug = True


@app.route('/', methods=['GET'])
def welcome():
    return render_template('hehe.html')


# test , passed!
@app.route('/loginValidness', methods=['POST'])
def loginValidness():
    userName = request.form['userName']
    passWD = request.form['passWD']
    type = request.form['type']
    stmt = f'select * from puser where userName = "{userName}" and passWD = "{passWD}"'
    resultSet = session.execute(stmt)
    match = 1 if resultSet.rowcount else 0
    identity = 0
    if (match == 1):
        if type == 'stu':
            stmt = f'select * from student where userName = "{userName}"'
            resultSet = session.execute(stmt)
            identity = 1 if resultSet.rowcount else 0
        elif type == 'ins':
            stmt = f'select * from teacher where userName = "{userName}"'
            resultSet = session.execute(stmt)
            identity = 1 if resultSet.rowcount else 0
        elif type == 'ta':
            stmt = f'select * from ta where userName = "{userName}"'
            resultSet = session.execute(stmt)
            identity = 1 if resultSet.rowcount else 0
        else:
            pass
    return json.dumps({'match': match, 'identity': identity}, indent=2)


'''
after login :
'''


# test , passed!
@app.route('/userInfo', methods=['POST'])
def userInfo():
    userName = request.form['userName']
    type = request.form['type']
    if type == 'stu':
        res = session.query(Student).filter(Student.userName == userName).all()
        stu = res[0]
        return json.dumps(stu, cls=MyJSONEncoder, indent=2, ensure_ascii=False)
    elif type == 'ins':
        res = session.query(Teacher).filter(Teacher.userName == userName).all()
        ins = res[0]
        return json.dumps(ins, cls=MyJSONEncoder, indent=2, ensure_ascii=False)
    elif type == 'ta':
        res = session.query(TA).filter(TA.userName == userName).all()
        ta = res[0]
        return json.dumps(ta, cls=MyJSONEncoder, indent=2, ensure_ascii=False)
    else:
        return json.dumps({'state': 404})


@app.route('/modifyInfo', methods=['POST'])
def modifyInfo():
    userName = request.form['userName']
    nickName = request.form['nickName']
    passWD = request.form['passWD']
    try:
        stmt = f'update puser set puser.nickName = "{nickName}" where puser.userName = "{userName}"'
        # session.query(PUser).filter(PUser.userName == userName).update({'nickName':nickName})
        session.execute(stmt)
        session.commit()
        if passWD != '':
            stmt = f'update puser set puser.passWD = "{passWD}" where puser.userName = "{userName}"'
            session.execute(stmt)
            session.commit()
        return json.dumps({'state': 200})
    except:
        return json.dumps({'state': 404})


# test , passed!
@app.route('/todolist', methods=['POST'])
def todolist():
    userName = request.form['userName']
    type = request.form['type']
    if type == 'stu':
        # 学生只回传作业列表
        stmt = f'select homeworkTitle,homework.startTime,homework.endTime,courseName from homework,participation,course where participation.studentUsername = "{userName}"'
        res = session.execute(stmt)
        todols = [{'作业名称': list(i)[0], '开始时间': list(i)[1], '结束时间': list(i)[2], '课程名称': list(i)[3]} for i in res]
        return json.dumps(todols, cls=MyJSONEncoder, indent=2, ensure_ascii=False)

    elif type == 'ta':
        stmt = f'SELECT submitUserName, handInTime, homeworkTitle,manage.courseDescriptor FROM handinhomework JOIN manage ON (handinhomework.courseDescriptor = manage.courseDescriptor)  WHERE manage.gradeHomework=1 and manage.userName = "{userName}"  and manage.courseDescriptor = (SELECT manage.courseDescriptor from manage NATURAL JOIN course WHERE manage.userName = "{userName}")'
        # similar to ins but ta requires gradeHomework privilege to be set to 1
        res = session.execute(stmt)
        todols = [{'提交者': list(i)[0], '提交时间': list(i)[1], '作业名称': list(i)[2], '课程名称': courseDescriptor2Name(list(i)[3])}
                  for i in res]
        return json.dumps(todols, cls=MyJSONEncoder, indent=2, ensure_ascii=False)

    elif type == 'ins':
        stmt = f'SELECT submitUserName, handInTime, homeworkTitle,manage.courseDescriptor FROM handinhomework JOIN manage ON (handinhomework.courseDescriptor = manage.courseDescriptor)  WHERE manage.userName = "{userName}"  and manage.courseDescriptor = (SELECT manage.courseDescriptor from manage NATURAL JOIN course WHERE manage.userName = "{userName}")'
        res = session.execute(stmt)
        todols = [{'提交者': list(i)[0], '提交时间': list(i)[1], '作业名称': list(i)[2], '课程名称': courseDescriptor2Name(list(i)[3])}
                  for i in res]
        return json.dumps(todols, cls=MyJSONEncoder, indent=2, ensure_ascii=False)
    else:
        return json.dumps({'state': 404})


@app.route('/manageCourse', methods=['POST'])
def manageCourse():
    userName = request.form['userName']
    stmt = f'SELECT courseDescriptor,courseName FROM course NATURAL JOIN manage WHERE manage.userName = "{userName}"'
    res = session.execute(stmt)
    course_list = [
        {'课程标识符': i[0], '课程名称': i[1]} for i in
        res]
    return json.dumps(course_list, cls=MyJSONEncoder, indent=2, ensure_ascii=False)


@app.route('/studyCourse', methods=['POST'])
def studyCourse():
    userName = request.form['userName']
    stmt = f'SELECT courseDescriptor,courseName FROM course NATURAL JOIN participation WHERE participation.studentUserName = "{userName}"'
    res = session.execute(stmt)
    course_list = [
        {'课程标识符': i[0], '课程名称': i[1]} for i in
        res]
    return json.dumps(course_list, cls=MyJSONEncoder, indent=2, ensure_ascii=False)


@app.route('/fetchFile', methods=['GET'])
def fetchFile():
    type = request.args.get('type')
    fileName = None
    if type == 1:
        fileName = request.args.get('fileName')
        return send_from_directory(filePath, fileName, as_attachment=True)
    elif type == 2:
        courseDes = request.args.get('fileName')
        stmt = select(Course.Image).where(Course.courseDescriptor == courseDes)
        res = session.execute(stmt)
        if len(res):
            fileName = res.fetchone()
        else:
            pass  # no file found
        return send_from_directory(filePath, fileName, as_attachment=True) if fileName is not None else json.dumps(
            {'state': 404})
    elif type == 3:
        fileName = request.args.get('fileName')
        return send_from_directory(filePath, fileName) if fileName is not None else json.dumps({'state': 404})
    else:
        # unexpected type
        pass
    return json.dumps({'state': 404})


if __name__ == '__main__':
    app.run(debug=True)
