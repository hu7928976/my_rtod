#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# @Time      :2022/4/24 11:34

# 创建蓝图
from flask import Blueprint, redirect

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


@rtod.route('/logout')
def logut():
    pass


@rtod.route('/login', methods = ['GET', 'POST'])
def login():
    pass


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



