from flask import Flask, request, make_response, send_from_directory, jsonify, render_template, redirect, url_for, flash
from Classes import Base, Engine, select, PUser, Teacher, Student, Course, Manage, Homework, HandInHomework, Reference, HandInHomework, session, TA, MyJSONEncoder
from flask_bootstrap import Bootstrap
from werkzeug.utils import secure_filename
import os
import json


filePath = '../static'
app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = os.urandom(24)


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


# 获取课程详情
@app.route('/courseInfo', methods=['GET'])
def courseInfo():
    courseDes = request.args.get('courseDes')
    stmt = f'select courseId, credit, semester, startTime, endTime, courseStart, courseEnd from course where Course.courseDescriptor == {courseDes}'
    res = session.execute(stmt)
    return json.dumps(res.fetchall(), ensure_ascii=False)


# 上传文件(学生上传作业,老师助教上传资料)
@app.route('/uploadfile', methods=['GET', 'POST'])
def uploadfile():
    type = request.args.get('type')
    if request.method == 'POST':
        f = request.files.get('file')
        basepath = os.path.dirname(__file__)
        if f :
            filename = secure_filename(f.filename)
            types = ['jpg', 'png', 'pdf', 'doc']
            if filename.split('.')[-1] in types:
                uploadpath = os.path.join(basepath, 'static/uploads', filename)
                f.save(uploadpath)
                flash('Upload Load Successful!', 'success')
            else:
                flash('Unknown Types!', 'danger')
        else:
            flash('No File Selected.', 'danger')
        if type == 'ins' or type == 'ta':
            refname = request.args.get('refname')
            file = request.args.get('file')
            datetime = request.args.get('datetime')
            downloadable = request.args.get('downloadable')
            courseDes = request.args.get('courseDes')
            stmt = f'insert into Reference values({refname}, {file}, {datetime}, {downloadable}, {courseDes})'
            res = session.execute(stmt)
            if res: return jsonify({'msg': '200'})
            else:
                pass
                return 404
        if type == 'stu':
            uname = request.args.get('uname')
            handintime = request.args.get('handintime')
            filename = request.args.get('filename')
            file = request.args.get('file')
            courseDes = request.args.get('courseDes')
            title = request.args.get('title')
            stmt = f'insert into Reference values({uname}, 1, 0, {handintime}, {filename}, {file}, {courseDes}, {title})'
            res = session.execute(stmt)
            if res:
                return jsonify({'msg': '200'})
            else:
                pass
                return 404
        return redirect(url_for('uploadfile'))
    return render_template('upload.html')


# 老师布置作业
@app.route('/assign', methods=['GET', 'POST'])
def assign():
    if request.method == 'POST':
        courseDes = request.json.get('courseDes')
        hwtitle = request.form['hwtitle']
        starttime = request.form['starttime']
        endtime = request.form['endtime']
        taskDes = request.form['taskDes']
        creatorUname = request.json.get('creatorUname')
        assignment = Homework(
            courseDescriptor=courseDes,
            homeworkTitle=hwtitle,
            startTime=starttime,
            endTime=endtime,
            taskDescription=taskDes,
            creatorUsername=creatorUname
        )
        session.add(assignment)
        session.commit()
        return jsonify({'msg': '200'})


# 老师批改作业
@app.route('/rating', methods=['POST'])
def rating():
    if request.method == 'POST':
        gradeuname = request.json.get('uname')
        grade = request.form['grade']
        filename = request.json.get('filename')
        stmt = f'update HandInHomework set gradeUserName = {gradeuname}, grades = {grade} where HandInHomework.fileName == {filename}'
        res = session.execute(stmt)
        if res:
            return jsonify({'msg': '200'})
        else:
            pass
            return 404


if __name__ == '__main__':
    app.run(debug=True)
