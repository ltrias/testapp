use tsk;

create user 'tsk' identified by 'tsk';
grant all privileges on *.* to 'tsk'@'%' identified by 'tsk';

create table products(
    name varchar(25),
    price float(10, 2),
    primary key(name)
);

insert into products(name, price) values 
('classic', 269.99), 
('standout', 322.99),
('premium', 394.99),
('jora membership', 99.00);