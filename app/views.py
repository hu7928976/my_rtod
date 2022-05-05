#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# @Time      :2022/4/24 11:34

# 创建蓝图
from hashlib import md5
from flask import Blueprint, redirect, render_template, request,session
import requests

from app import ini_auth



rtod = Blueprint('ai-rtod', __name__)

# 启动时间
app_start_time = 0


@rtod.route('/')
@rtod.route('/index')
def index():
    if False:
        return redirect('/auth')


@rtod.route('/changepwd', methods=['POST'])
def change_password():
    pass

# 注销
@rtod.route('/logout')
def logut():
    session['sign_in'] = False

# 登录
@rtod.route('/login', methods = ['GET', 'POST'])
def login():
    # 判断是否授权
    if not ini_auth.has():
        return redirect('/auth')
    
    if session.get('sign_in'):
        return redirect('/index')

    # 安全设置， 防止通过GET方式提交密码
    if request.method == 'GET':
        return render_template('login/login.html')

    password = md5(requests.form.get('password').\
        encode(encoding = 'utf-8')).hexdigest
    
    if password == ini_auth.get('account', 'password'):


@rtod.route('/check_password', methods=['GET', 'POST'])
def check_password():
    pass


@rtod.route('/auth', methods = ['GET', 'POST'])
def auth():
    if True:
        return redirect('/index')



@rtod.route('/grant', methods = ['GET','POST'])
def grant():
    pass


@rtod.route('/set-network', methods = ['GET', 'POST'])
def set_networt():
    pass


@rtod.route('/deviceinfo')
def get_device_info():
    pass



