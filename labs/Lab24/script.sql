create database Lab24;
use Lab24;

-- drop table users;
-- drop table repos;
-- drop table commits;

create table users(
    id int identity(1, 1) primary key,
    username nvarchar(50) not null ,
    email nvarchar(100) not null ,
    password nvarchar(50) not null ,
    role nvarchar(10) not null
)

create table repos(
    id int identity(1, 1) primary key,
    name nvarchar(50) not null ,
    authorid int,
    foreign key (authorid) references users(id) on delete cascade on update cascade
)

create table commits(
    id int identity(1, 1) primary key,
    message nvarchar(200) not null ,
    repoid int not null ,
    foreign key (repoid) references repos(id) on delete cascade on update cascade
)

insert into users(username, email, password, role)
    values  ('user1', 'user1@yahoo.com','password1', 'Admin'),
            ('user2', 'user2@yahoo.com','password2', 'User')

insert into repos(name, authorid)
    values ('C#', 1),
           ('Java', 1),
           ('NodeJS', 1),
           ('C++', 2),
           ('C', 2),
           ('ASM', 2)

insert into commits(message, repoid)
    values ('first commit', 1),
           ('second commit', 1),
           ('first commit', 2),
           ('second commit', 2),
           ('third commit', 2),
           ('first commit', 4),
           ('second commit', 4),
           ('third commit', 4),
           ('fourth commit', 4);

select * from repos;
select * from commits;