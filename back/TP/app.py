from flask import Flask, request, make_response, send_from_directory
from Classes import Base, Engine, select, PUser, Teacher, Student, Course, Manage, Homework, HandInHomework, Reference, \
    HandInHomework, session, TA, MyJSONEncoder
import json

filePath = '../static'
app = Flask(__name__)


@app.route('/loginValidness', methods=['POST'])
def loginValidness():
    uname = request.form['userid']
    passwd = request.form['pswd']
    type = request.form['type']
    stmt = select(PUser).where(PUser.userName == uname and PUser.passWD == passwd)
    resultSet = session.execute(stmt)
    match = 1 if len(resultSet) else 0
    identity = 0
    if (match == 1):
        if type == 'stu':
            stmt = select(Teacher.userName).where(Teacher.userName == uname)
            identity = 1 if len(session.execute(stmt)) else 0
        elif type == 'ins':
            identity = 1 if len(session.execute(stmt)) else 0
        elif type == 'ta':
            stmt = select(TA.userName).where(TA.userName == uname)
            identity = 1 if len(session.execute(stmt)) else 0
        else:
            pass
    return json.dumps({'match': match, 'identity': identity}, indent=2)


'''
after login
'''


@app.route('/userInfo', methods=['GET'])
def userInfo():
    uname = request.args.get('id')
    type = request.args.get('type')
    if type == 'stu':
        stmt = select(Student).where(Student.userName == uname)
        res = session.execute(stmt)
        stu = res.fetchone()
        return json.dumps(stu, cls=MyJSONEncoder, indent=2)
    elif type == 'ins':
        stmt = select(Teacher).where(Teacher.userName == uname)
        res = session.execute(stmt)
        ins = res.fetchone()
        return json.dumps(ins, cls=MyJSONEncoder, indent=2)
    elif type == 'ta':
        stmt = select(TA).where(TA.userName == uname)
        res = session.execute(stmt)
        ta = res.fetchone()
        return json.dumps(ta, cls=MyJSONEncoder, indent=2)
    else:
        pass


@app.route('/todolist', methods=['GET'])
def todolist():
    userName = request.args.get('userName')
    type = request.args.get('type')
    if type == 1:
        # 学生只回传作业列表
        stmt = f'select homeworkTitle,startTime,endTime,courseName from homework,participation where participation.studentUsername == {userName}'
        res = session.execute(stmt)
        todols = [i for i in res]
        return json.dumps(todols)

    elif type == 2:
        stmt = f'select courseName, submitUserName, handInTime, homeworkTitle from handinhomework,manage,course where manage.userName == {userName} group by courseName'
        res = session.execute(stmt)
        todols = [i for i in res.fetchall()]
        return json.dumps(todols)
    elif type == 3:
        stmt = f'select courseName, submitUserName, handInTime, homeworkTitle from handinhomework,manage,course where manage.userName == {userName} group by courseName'
        res = session.execute(stmt)
        todols = [i for i in res.fetchall()]
        return json.dumps(todols)
    else:
        return 404


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
        return send_from_directory(filePath, fileName, as_attachment=True) if fileName is not None else 404
    elif type == 3:
        fileName = request.args.get('fileName')
        return send_from_directory(filePath, fileName) if fileName is not None else 404
    else:
        # unexpected type
        pass
    return 404


if __name__ == '__main__':
    app.run(debug=True)
