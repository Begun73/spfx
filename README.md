# test

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Что нужно чтобы работало

- node js 10.x.x (Версии Node.js v9.x, v11.x и v12.x в настоящее время не поддерживаются при разработке SharePoint Framework)
- npm install gulp yo @microsoft/generator-sharepoint --global (Коплект всего необходимого)
- gulp trust-dev-cert (Чтобы не мучали сертификаты)

## Build options (inner false)

Собираем вебчасть с файлами на локальной тачке
gulp package-solution 

Запускаем сервер для подгрузки файлов
gulp serve --nobrowser

## Build options (inner true)

Делаем независисую сборку для SP
gulp bundle --ship
gulp package-solution --ship

# Стоковый набор запуска
  - **npm install**
  - **gulp serve**
