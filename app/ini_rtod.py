#!/usr/bin/env python3
# -*- coding:utf-8 -*-
import os
import configparser
import threading

from conf.rtod import rtod_ini_file

# print(os.path.join(os.path.dirname()os.path.dirname(os.path.abspath(__file__))), rtod_ini_file)
rtod_ini_file = (os.path.dirname(os.path.abspath(__file__)), rtod_ini_file)
print(rtod_ini_file)