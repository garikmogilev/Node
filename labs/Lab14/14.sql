/*create database UNIVERSITY;

use UNIVERSITY;
go;
*/
------------�������� � ���������� ������� AUDITORIUM_TYPE
create table AUDITORIUM_TYPE
(    AUDITORIUM_TYPE  nchar(10) constraint AUDITORIUM_TYPE_PK  primary key,
      AUDITORIUM_TYPENAME  nvarchar(30)
 )
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )  values (N'��', N'����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )  values (N'��-�', N'������������ �����');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )  values (N'��-�', N'���������� � ���. ����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )  values (N'��-X', N'���������� �����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )  values (N'��-��', N'����. ������������ �����');

-- drop table AUDITORIUM_TYPE;


/*-- drop table PROGRESS
drop table STUDENT
drop table GROUPS
drop table SUBJECT
drop table TEACHER
drop table  PULPIT
drop table PROFESSION
drop table FACULTY
drop table AUDITORIUM
drop table AUDITORIUM_TYPE
*/

-------------�������� � ���������� ������� AUDITORIUM  
  create table AUDITORIUM 
(   AUDITORIUM   nchar(20)  constraint AUDITORIUM_PK  primary key,              
    AUDITORIUM_TYPE     nchar(10) constraint  AUDITORIUM_AUDITORIUM_TYPE_FK foreign key         
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE), 
   AUDITORIUM_CAPACITY  integer constraint  AUDITORIUM_CAPACITY_CHECK default 1  check (AUDITORIUM_CAPACITY between 1 and 300),  -- ����������� 
   AUDITORIUM_NAME      nvarchar(50)                                     
)
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME,  
 AUDITORIUM_TYPE, AUDITORIUM_CAPACITY)   
values  (N'206-1', N'206-1' ,N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) 
values  (N'301-1',   N'301-1', N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )   
values  (N'236-1',   N'236-1', N'��',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )  
values  (N'313-1',   N'313-1', N'��-�',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )  
values  (N'324-1',   N'324-1', N'��-�',   50);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )   
 values  (N'413-1',   N'413-1', N'��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY ) 
values  (N'423-1',   N'423-1', N'��-�', 90);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, 
AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )     
values  (N'408-2',   N'408-2', N'��',  90);

  ------�������� � ���������� ������� FACULTY
  create table FACULTY
  (    FACULTY      nchar(10)   constraint  FACULTY_PK primary key,
       FACULTY_NAME  nvarchar(50) default N'???'
  );
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'����',   N'���������� ���������� � �������');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'���',     N'����������������� ���������');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'���',     N'���������-������������� ���������');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'����',    N'���������� � ������� ������ ��������������');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'���',     N'���������� ������������ �������');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  (N'��',     N'��������� �������������� ����������');  
------�������� � ���������� ������� PROFESSION
   create table PROFESSION
  (   PROFESSION   nchar(20) constraint PROFESSION_PK  primary key,
       FACULTY    nchar(10) constraint PROFESSION_FACULTY_FK foreign key 
                            references FACULTY(FACULTY),
       PROFESSION_NAME nvarchar(100),    QUALIFICATION   nvarchar(50)  
  );  
 insert into PROFESSION(FACULTY, PROFESSION, PROFESSION_NAME, QUALIFICATION)    values    (N'��',  N'1-40 01 02',   N'�������������� ������� � ����������', N'�������-�����������-�������������' );
 insert into PROFESSION(FACULTY, PROFESSION, PROFESSION_NAME, QUALIFICATION)    values    (N'��',  N'1-47 01 01', N'������������ ����', N'��������-��������' );
 insert into PROFESSION(FACULTY, PROFESSION,  PROFESSION_NAME, QUALIFICATION)    values    (N'��',  N'1-36 06 01',  N'��������������� ������������ � ������� ��������� ����������', N'�������-��������������' );
 insert into PROFESSION(FACULTY, PROFESSION,  PROFESSION_NAME, QUALIFICATION)  values    (N'����',  N'1-36 01 08',    N'��������������� � ������������ ������� �� �������������� ����������', N'�������-�������' );
 insert into PROFESSION(FACULTY, PROFESSION,  PROFESSION_NAME, QUALIFICATION)      values    (N'����',  N'1-36 07 01',  N'������ � �������� ���������� ����������� � ����������� ������������ ����������', N'�������-�������' );
 insert into PROFESSION(FACULTY, PROFESSION, PROFESSION_NAME, QUALIFICATION)  values    (N'���',  N'1-75 01 01',      N'������ ���������', N'������� ������� ���������' );
 insert into PROFESSION(FACULTY, PROFESSION,  PROFESSION_NAME, QUALIFICATION)   values    (N'���',  N'1-75 02 01',   N'������-�������� �������������', N'������� ������-��������� �������������' );
 insert into PROFESSION(FACULTY, PROFESSION,     PROFESSION_NAME, QUALIFICATION)   values    (N'���',  N'1-89 02 02',     N'������ � ������������������', N'���������� � ����� �������' );
 insert into PROFESSION(FACULTY, PROFESSION, PROFESSION_NAME, QUALIFICATION)  values    (N'���',  N'1-25 01 07',  N'��������� � ���������� �� �����������', N'���������-��������' );
 insert into PROFESSION(FACULTY, PROFESSION,  PROFESSION_NAME, QUALIFICATION)      values    (N'���',  N'1-25 01 08',    N'������������� ����, ������ � �����', N'���������' );                      
 insert into PROFESSION(FACULTY, PROFESSION,     PROFESSION_NAME, QUALIFICATION)  values    (N'����',  N'1-36 05 01',   N'������ � ������������ ������� ���������', N'�������-�������' );
 insert into PROFESSION(FACULTY, PROFESSION,   PROFESSION_NAME, QUALIFICATION)   values    (N'����',  N'1-46 01 01',      N'�������������� ����', N'�������-��������' );
 insert into PROFESSION(FACULTY, PROFESSION,     PROFESSION_NAME, QUALIFICATION)      values    (N'���',  N'1-48 01 02',  N'���������� ���������� ������������ �������, ���������� � �������', N'�������-�����-��������' );                
 insert into PROFESSION(FACULTY, PROFESSION,   PROFESSION_NAME, QUALIFICATION)    values    (N'���',  N'1-48 01 05',    N'���������� ���������� ����������� ���������', N'�������-�����-��������' ); 
 insert into PROFESSION(FACULTY, PROFESSION,    PROFESSION_NAME, QUALIFICATION)  values    (N'���',  N'1-54 01 03',   N'������-���������� ������ � ������� �������� �������� ���������', N'������� �� ������������' ); 



------�������� � ���������� ������� PULPIT
  create table  PULPIT 
(   PULPIT   nchar(20)  constraint PULPIT_PK  primary key,
    PULPIT_NAME  nvarchar(100), 
    FACULTY   nchar(10)   constraint PULPIT_FACULTY_FK foreign key 
                         references FACULTY(FACULTY) 
);  
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values  (N'����', N'�������������� ������ � ���������� N' ,N'��'  )
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
values  (N'������' ,N'���������������� ������������ � ������ ��������� ���������� N', N'����'  )
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values  (N'��', N'����������� ���������' ,N'����'  )
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
   values  (N'���', N'�����������-������������ ���������', N'����'  )            
insert into PULPIT   (PULPIT,  PULPIT_NAME, FACULTY )
   values  (N'��', N'��������������� �����������' ,N'����'  )                              
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
    values  (N'��', N'�����������' ,N'���')          
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
   values  (N'��', N'��������������' ,N'���')           
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
  values  (N'�����', N'���������� � ����������������' ,N'���')                
insert into PULPIT   (PULPIT,  PULPIT_NAME, FACULTY)
   values  (N'����', N'������ ������� � ������������' ,N'���') 
insert into PULPIT   (PULPIT,  PULPIT_NAME, FACULTY)
   values  (N'���', N'������� � ������������������' ,N'���')              
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
   values  (N'������' ,N'������������ �������������� � ������-��������� �������������' ,N'���')          
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
   values  (N'��', N'���������� ����', N'����')                          
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
   values  (N'�����' ,N'������ ����� � ���������� �������������' ,N'����')  
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
   values  (N'���' ,N'���������� �������������������� �����������', N'����')   
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
values  (N'�����' ,N'���������� � ������� ������� �� ���������' ,N'����')    
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
values  (N'��', N'������������ �����' ,N'���') 
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
 values  (N'���' ,N'���������� ����������� ���������' ,N'���')             
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
 values  (N'�������' ,N'���������� �������������� ������� � ����� ���������� ���������� N' ,N'����') 
insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY)
    values  (N'�����' ,N'��������� � ��������� ���������� �����������' ,N'����')                                               
insert into PULPIT   (PULPIT,    PULPIT_NAME, FACULTY)
values  (N'����',    N'������������� ������ � ����������' ,N'���')   
insert into PULPIT   (PULPIT,    PULPIT_NAME, FACULTY)
  values  (N'����',   N'����������� � ��������� ������������������' ,N'���')   
insert into PULPIT   (PULPIT,    PULPIT_NAME, FACULTY)
   values  (N'������', N'����������, �������������� �����, ������� � ������', N'���')     
             
------�������� � ���������� ������� TEACHER
 create table TEACHER
 (   TEACHER    nchar(10)  constraint TEACHER_PK  primary key,
     TEACHER_NAME  nvarchar(100), 
     GENDER     nchar(1) CHECK (GENDER in (N'�', N'�')),
     PULPIT   nchar(20) constraint TEACHER_PULPIT_FK foreign key 
                         references PULPIT(PULPIT) 
 );
insert into  TEACHER    (TEACHER,   TEACHER_NAME, GENDER, PULPIT )
                       values  (N'����',    N'������ �������� �������������', N'�',  N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'�����',    N'�������� ��������� ��������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'�����',    N'���������� ������� ����������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'�����',    N'�������� ������ ��������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'����� ��������� ����������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'��������� ����� ��������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                      values  (N'���',     N'����� ������� ��������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'����� ������� �������������',  N'�', N'����');                     
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'����� ����� �������������',  N'�',   N'����');                                                                                           
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
             values  (N'������',   N'���������� ��������� �������������', N'�' ,N'������');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'��������� ������� �����������', N'�', N'������');                       
insert into  TEACHER    (TEACHER,  TEACHER_NAME,GENDER, PULPIT )
                       values  (N'������',   N'����������� ��������� ��������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'����',   N'������� ��������� ����������', N'�', N'����');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'����',   N'������ ������ ��������', N'�', N'��');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'����', N'������� ������ ����������',  N'�',  N'������');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',     N'���������� ������� ��������', N'�', N'������');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'���',   N'������ ������ ���������� N', N'�', N'��');                      
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'�����',   N'��������� �������� ���������', N'�', N'�����'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'������',   N'���������� �������� ����������', N'�', N'��'); 
insert into  TEACHER    (TEACHER,  TEACHER_NAME, GENDER, PULPIT )
                       values  (N'�����',   N'�������� ������ ����������', N'�', N'��'); 

------�������� � ���������� ������� SUBJECT
create table SUBJECT
    (     SUBJECT  nchar(10) constraint SUBJECT_PK  primary key, 
           SUBJECT_NAME nvarchar(100) unique,
           PULPIT  nchar(20) constraint SUBJECT_PULPIT_FK foreign key 
                         references PULPIT(PULPIT)   
     )
 insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'����',   N'������� ���������� ������ ������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT)
                       values (N'��',     N'���� ������',N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'���',    N'�������������� ����������',N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'����',  N'������ �������������� � ����������������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'��',     N'������������� ������ � ������������ ��������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'���',    N'���������������� ������� ����������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'����',  N'������������� ������ ��������� ����������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'���',     N'�������������� �������������� ������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'��',      N'������������ ��������� N',N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
           values (N'�����',   N'��������. ������, �������� � �������� �����', N'������');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,  PULPIT )
                       values (N'���',     N'������������ �������������� �������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'���',     N'����������� ��������. ������������', N'������');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT)
                       values (N'��',   N'���������� ����������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                      values (N'��',   N'�������������� ����������������',N'����');  
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
               values (N'����', N'���������� ������ ���',  N'����');                   
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
               values (N'���',  N'��������-��������������� ����������������', N'����');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'��', N'��������� ������������������',N'����')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'��', N'������������� ������',N'����')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'������OO',N'�������� ������ ������ � ���� � ���. ������.',N'��')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'�������',N'������ ������-��������� � ������������� ���������',  N'������')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                       values (N'��', N'���������� �������� N',N'��')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                       values (N'��',    N'�����������', N'�����') 
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'��',    N'������������ �����', N'��')   
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                       values (N'���',    N'���������� ��������� �������',N'��������') 
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'���',    N'������ ��������� ����',N'��')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                       values (N'����',   N'���������� � ������������ �������������', N'�����') 
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,PULPIT )
                       values (N'����',   N'���������� ���������� �������� ���������� N',N'�������')
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
                       values (N'���',    N'���������� ������������',N'��������')                                                                                                                                                           
  
------�������� � ���������� ������� GROUPS
create table GROUPS 
(   IDGROUP  integer  identity(1,1) constraint GROUP_PK  primary key,              
    FACULTY   nchar(10) constraint  GROUPS_FACULTY_FK foreign key         
                                                         references FACULTY(FACULTY), 
     PROFESSION  nchar(20) constraint  GROUPS_PROFESSION_FK foreign key         
                                                         references PROFESSION(PROFESSION),
    YEAR_FIRST  smallint  check (YEAR_FIRST<=YEAR(GETDATE())),                  
  )
insert into GROUPS   (FACULTY,  PROFESSION, YEAR_FIRST )
         values (N'��','1-40 01 02', 2013), --1
                (N'��',N'1-40 01 02', 2012),
                (N'��',N'1-40 01 02', 2011),
                (N'��',N'1-40 01 02', 2010),
                (N'��',N'1-36 06 01', 2010),-----8 ��
                (N'��',N'1-36 06 01', 2013),
                (N'��',N'1-36 06 01', 2012),
                (N'��',N'1-36 06 01', 2011),
                (N'����',N'1-36 01 08', 2013),---12 ��                                                  
                (N'����',N'1-36 01 08', 2012),
                (N'����',N'1-36 07 01', 2011),
                (N'����',N'1-36 07 01', 2010),
                (N'���',N'1-48 01 02', 2012), ---16 �� 
                (N'���',N'1-48 01 02', 2011),
                (N'���',N'1-48 01 05', 2013),
                (N'���',N'1-54 01 03', 2012),
                (N'���',N'1-75 01 01', 2013),--20 ��      
                (N'���',N'1-75 02 01', 2012),
                (N'���',N'1-75 02 01', 2011),
                (N'���',N'1-89 02 02', 2012),
                (N'���',N'1-89 02 02', 2011),  
                (N'����',N'1-36 05 01', 2013),
                (N'����',N'1-36 05 01', 2012),
                (N'����',N'1-46 01 01', 2012),--27 ��
                (N'���',N'1-25 01 07', 2013), 
                (N'���',N'1-25 01 07', 2012),     
                (N'���',N'1-25 01 07', 2010),
                (N'���',N'1-25 01 08', 2013),
                (N'���',N'1-25 01 08', 2012) ---32 ��       
                          
------�������� � ���������� ������� STUDENT
create table STUDENT 
(    IDSTUDENT   integer  identity(1000,1) constraint STUDENT_PK  primary key,
      IDGROUP   integer  constraint STUDENT_GROUP_FK foreign key         
                      references GROUPS(IDGROUP),        
      NAME   nvarchar(100), 
      BDAY   date,
      STAMP  timestamp,
      INFO     xml,
      FOTO     varbinary
 ) 
insert into STUDENT (IDGROUP, NAME, BDAY)
        values (1, N'���������� ��������� �������������', N'11.03.1995'),        
          (1, N'������ ��������� �������',    N'07.12.1995'),
           (1, N'������ �������� ����������',  N'12.10.1995'),
           (1, N'����� ��������� ���������',   N'08.01.1995'),
           (1, N'����� ����� ��������',  N'02.08.1995')       
insert into STUDENT (IDGROUP,NAME, BDAY)
    values (2, N'����� ������� ��������',         N'12.07.1994'),
           (2, N'������� �������� ����������',    N'06.03.1994'),
           (2, N'�������� ����� �����������',     N'09.11.1994'),
           (2, N'������� ����� ���������',        N'04.10.1994'),
           (2, N'��������� ��������� ����������', N'08.01.1994'),
           (3, N'������� ������ ���������',       N'02.08.1993'),
           (3, N'������� ��� ����������',         N'07.12.1993'),
           (3, N'������� ����� �����������',      N'02.12.1993'),
           (4, N'������� ������ �����������',     N'08.03.1992'),
           (4, N'������� ����� �������������',    N'02.06.1992'),
           (4, N'�������� ����� �����������',     N'11.12.1992'),
           (4, N'�������� ������� �������������', N'11.05.1992'),
           (4, N'����������� ������� ��������',   N'09.11.1992'),
           (4, N'�������� ������� ����������',    N'01.11.1992'),
           (5, N'�������� ����� ������������',    N'08.07.1995'),
           (5, N'������ ������� ����������',      N'02.11.1995'),
           (5, N'������ ��������� �����������',   N'07.05.1995'),
           (5, N'����� ��������� ���������',      N'04.08.1995'),
           (6, N'���������� ����� ����������',    N'08.11.1994'),
           (6, N'�������� ������ ��������',       N'02.03.1994'),
           (6, N'���������� ����� ����������',    N'04.06.1994'),
           (6, N'��������� ���������� ���������', N'09.11.1994'),
           (6, N'����� ��������� �������',        N'04.07.1994'),
           (7, N'����������� ����� ������������', N'03.01.1993'),
           (7, N'������� ���� ��������',          N'12.09.1993'),
           (7, N'��������� ������ ��������',      N'12.06.1993'),
           (7, N'���������� ��������� ����������',N'09.02.1993'),
           (7, N'������� ������ ���������',       N'04.07.1993'),
           (8, N'������ ������� ���������',       N'08.01.1992'),
           (8, N'��������� ����� ����������',     N'12.05.1992'),
           (8, N'�������� ����� ����������',      N'08.11.1992'),
           (8, N'������� ������� ���������',      N'12.03.1992'),
           (9, N'�������� ����� �������������',   N'10.08.1995'),
           (9, N'���������� ������ ��������',     N'02.05.1995'),
           (9, N'������ ������� �������������',   N'08.01.1995'),
           (9, N'��������� ��������� ��������',   N'11.09.1995'),
           (10, N'������ ������� ������������',   N'08.01.1994'),
           (10, N'������ ������ ����������',      N'11.09.1994'),
           (10, N'����� ���� �������������',      N'06.04.1994'),
           (10, N'������� ������ ����������',     N'12.08.1994')

insert into STUDENT (IDGROUP,NAME, BDAY)
    values (11, N'��������� ��������� ����������',N'07.11.1993'),
           (11, N'������ ������� ����������',     N'04.06.1993'),
           (11, N'������� ����� ����������',      N'10.12.1993'),
           (11, N'������� ������ ����������',     N'04.07.1993'),
           (11, N'������� ����� ���������',       N'08.01.1993'),
           (11, N'����� ������� ����������',      N'02.09.1993'),
           (12, N'���� ������ �����������',       N'11.12.1995'),
           (12, N'������� ���� �������������',    N'10.06.1995'),
           (12, N'��������� ���� ���������',      N'09.08.1995'),
           (12, N'����� ����� ���������',         N'04.07.1995'),
           (12, N'��������� ������ ����������',   N'08.03.1995'),
           (12, N'����� ����� ��������',          N'12.09.1995'),
           (13, N'������ ����� ������������',     N'08.10.1994'),
           (13, N'���������� ����� ����������',   N'10.02.1994'),
           (13, N'�������� ������� �������������',N'11.11.1994'),
           (13, N'���������� ����� ����������',   N'10.02.1994'),
           (13, N'����������� ����� ��������',    N'12.01.1994'),
           (14, N'�������� ������� �������������',N'11.09.1993'),
           (14, N'������ �������� ����������',    N'01.12.1993'),
           (14, N'���� ������� ����������',       N'09.06.1993'),
           (14, N'�������� ���������� ����������',N'05.01.1993'),
           (14, N'����������� ����� ����������',  N'01.07.1993'),
           (15, N'������� ��������� ���������',   N'07.04.1992'),
           (15, N'������ �������� ���������',     N'10.12.1992'),
           (15, N'��������� ����� ����������',    N'05.05.1992'),
           (15, N'���������� ����� ������������', N'11.01.1992'),
           (15, N'�������� ����� ����������',     N'04.06.1992'),
           (16, N'����� ����� ����������',        N'08.01.1994'),
           (16, N'��������� ��������� ���������', N'07.02.1994'),
           (16, N'������ ������ �����������',     N'12.06.1994'),
           (16, N'������� ����� ��������',        N'03.07.1994'),
           (16, N'������ ������ ���������',       N'04.07.1994'),
           (17, N'������� ��������� ����������',  N'08.11.1993'),
           (17, N'������ ����� ����������',       N'02.04.1993'),
           (17, N'������ ���� ��������',          N'03.06.1993'),
           (17, N'������� ������ ���������',      N'05.11.1993'),
           (17, N'������ ������ �������������',   N'03.07.1993'),
           (18, N'��������� ����� ��������',      N'08.01.1995'),
           (18, N'���������� ��������� ���������',N'06.09.1995'),
           (18, N'�������� ��������� ����������', N'08.03.1995'),
           (18, N'��������� ����� ��������',      N'07.08.1995')

------�������� � ���������� ������� PROGRESS
create table PROGRESS
 (  SUBJECT   nchar(10) constraint PROGRESS_SUBJECT_FK foreign key
                      references SUBJECT(SUBJECT),                
     IDSTUDENT integer  constraint PROGRESS_IDSTUDENT_FK foreign key         
                      references STUDENT(IDSTUDENT),        
     PDATE    date, 
     NOTE     integer check (NOTE between 1 and 10)
  )
insert into PROGRESS (SUBJECT, IDSTUDENT, PDATE, NOTE)
    values (N'����', 1000,  N'01.10.2013',6),
           (N'����', 1001,  N'01.10.2013',8),
           (N'����', 1002,  N'01.10.2013',7),
           (N'����', 1003,  N'01.10.2013',5),
           (N'����', 1005,  N'01.10.2013',4)
insert into PROGRESS (SUBJECT, IDSTUDENT, PDATE, NOTE)
    values   (N'����', 1014,  N'01.12.2013',5),
           (N'����', 1015,  N'01.12.2013',9),
           (N'����', 1016,  N'01.12.2013',5),
           (N'����', 1017,  N'01.12.2013',4)
insert into PROGRESS (SUBJECT, IDSTUDENT, PDATE, NOTE)
    values (N'��',   1018,  N'06.5.2013',4),
           (N'��',   1019,  N'06.05.2013',7),
           (N'��',   1020,  N'06.05.2013',7),
           (N'��',   1021,  N'06.05.2013',9),
           (N'��',   1022,  N'06.05.2013',5),
           (N'��',   1023,  N'06.05.2013',6)



