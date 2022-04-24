#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# @Time      :2022/4/24 11:31

# 创建app
from flask import Flask

from app.views import rtod

app = Flask(__name__)
app.register_blueprint(rtod)

