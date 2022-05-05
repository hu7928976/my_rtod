#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# @Time      :2022/4/24 16:24
import configparser
from conf.rtod import auth_ini_file
import os
config = configparser.ConfigParser()

auth_ini_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), auth_ini_file)
print(auth_ini_file)

def create(data):
    config['auth'] = {
        'platform': data['platformUrl'],
        'orgcode': data['orgCode'],
        'orgname': data['orgName']
    }

    with open(auth_ini_file, 'w') as authfile:
        config.write(authfile)


def remove():
    os.remove(auth_ini_file)


def has():
    config.read(auth_ini_file)
    if os.path.exists(auth_ini_file) and config.has_section('auth'):
        return True
    else:
        return False


def get(key):
    config.read(auth_ini_file)

    return config.get('auth', key)


def get_dict():
    config.read(auth_ini_file)

    return dict(config['auth'])

