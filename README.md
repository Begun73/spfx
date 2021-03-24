# SPFX view/edit

## Used SharePoint Framework Version and React

Модуль для SPO. Редактирование, создание и отображение элементов списка.

## Что нужно чтобы работало

- node js 10.x.x (Версии Node.js v9.x, v11.x и v12.x в настоящее время не поддерживаются при разработке SharePoint Framework)
- npm install gulp yo @microsoft/generator-sharepoint --global (Коплект всего необходимого)
- gulp trust-dev-cert (Чтобы не мучали сертификаты)

## Build options (inner false)

>Собираем вебчасть с файлами на локальной тачке
```sh
gulp package-solution 
```
>Запускаем сервер для подгрузки файлов
```sh
gulp serve --nobrowser
```

## Build options (inner true)

>Делаем независисую сборку для SP

```sh
gulp bundle --ship
gulp package-solution --ship
```

## Стоковый набор запуска
```sh
npm install
gulp serve
```
