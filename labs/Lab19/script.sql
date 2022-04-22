-- create database HiringStaff;
use HiringStaff;

drop table if exists JOBOPENINGS;
drop table if exists SPECIALIZATIONS;
drop table if exists REGIONS;
drop table if exists CITIES;

-- zone create tables --
create table SPECIALIZATIONS
(
    name nvarchar(100)  constraint PK_SPECIALIZATIONS primary key
)

create table REGIONS
(
    code nvarchar(3)  constraint PK_REGION primary key,
    name nvarchar(30) not null
)

create table CITIES(
    name nvarchar(30) constraint PK_CITY primary key,
    region nvarchar(3) foreign key references REGIONS(code) on delete cascade,
)

create table JOBS(
    id INT IDENTITY(1, 1) CONSTRAINT PK_JobsID PRIMARY KEY,
    name nvarchar(20) not null ,
    description nvarchar(max) not null ,
    date_published date,
    region nvarchar(3) foreign key references REGIONS(code)  on delete cascade,
    specialization nvarchar(100) foreign key references SPECIALIZATIONS (name) on delete cascade,
)

insert into CITIES (name, region)
    values  (N'Минск', 'by'),
            (N'Могилев', 'by'),
            (N'Гродно', 'by'),
            (N'Гомель', 'by'),
            (N'Брест', 'by'),
            (N'Полоцк', 'by'),
            (N'Витебск', 'by'),
            (N'Москва', 'ru'),
            (N'Санкт-Петербург', 'ru'),
            (N'Омск', 'ru'),
            (N'Сммоленск', 'ru'),
            (N'Екатеренбург', 'ru');


insert into REGIONS (code, name)
    values  ('by', 'Belarus'),
            ('ru', 'Russian'),
            ('kz', 'Kazakhstan');

insert into SPECIALIZATIONS (name)
    values  (N'Безопасность'),
            (N'Менеджмент'),
            (N'Маркетинг, реклама, PR'),
            (N'Медицина, фармацевтика'),
            (N'Наука, образование'),
            (N'Продажи'),
            (N'Розничная торговля'),
            (N'Сельское хозяйство'),
            (N'Строительство'),
            (N'Логистика'),
            (N'Юристы'),
            (N'Туризм, гостиницы, рестораны'),
            (N'Финансы, бухгалтерия'),
            (N'Информационные технологии');

