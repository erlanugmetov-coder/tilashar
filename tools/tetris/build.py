#!/usr/bin/env python3
"""Сборка: python3 build.py out.html  (из src.html + robot.svg + trees.txt + combos.json)"""
import sys,os
d=os.path.dirname(os.path.abspath(__file__));r=lambda f:open(os.path.join(d,f),encoding='utf-8').read()
s=r('src.html');t=r('trees.txt').split('\n')
s=s.replace('__ROBOT__',r('robot.svg')).replace('__TREE0__',t[0].replace('<svg ','<svg width="100%" height="100%" ')).replace('__TREE1__',t[1].replace('<svg ','<svg width="100%" height="100%" ')).replace('__COMBOS__',r('combos.json'))
open(sys.argv[1],'w',encoding='utf-8').write(s)
