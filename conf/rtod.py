#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# @Time      :2022/4/24 16:28

# 数据文件
rtod_ini_file = 'data/rtod.ini'
rtod_db_file = 'data/rtod.db'
# 授权文件
auth_ini_file = 'data/auth.ini'

# 分析进程PID文件及分析配置数据文件
inference_pid_file = 'pidfiles/inference.pid'
inference_setting_file = 'data/inference_setting.json'

authcheck_pid_file = 'pidfiles/authcheck.pid'
publish_pid_file = 'pidfiles/mqtt.pid'

# 日志目录
rtod_log_dir = "log"
# 日志文件
rtod_log_file = "rtod.log"
# 日志级别
rtod_log_level = "debug" # debug, info, warning, error

# 项目管理平台API配置
class PMApi:
    URL = "http://192.168.1.110"
    DEVICECODE = "/pm/dm/getDeviceCode"
    GRANT = "pm/pm/grant"
    GETDEVICEINFO = "pm/pm/getDeviceInfo" #  查询获取授权
    UPDATE = "pm/update/callback"  # 更新
    REVOKEAUTH = "/pm/pm/revokeAuth" # 删授权
    REPORT = "/pm/log/pass/report" # 日志上报


# 业务平台API配置
class PlatformApi:
    ADDAIBOX = "org/aibox/pass/add" # 添加智能分析盒
    ISAUTH = "org/base/pass/isAuth" # 判断是否授权
    MQTTCONFIG = "org/base/pass/mqttConfig"
    IPCPASS = "org/ipc/pass/gts"

# 推理分析API配置
class InferenceApi:
    URL = "http://localhost:11011"
    START = "ec/v1/start"
    SETTING = "ec/v1/setting"
    UNBOUND = "ec/v1/unbound"

# pm_api = PMApi()
# platform_api = PlatformApi()
# inference_api = InferenceApi()
