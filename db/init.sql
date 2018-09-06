drop table if exists memes;
drop table if exists users;

create table if  not exists users(
    id serial primary key,
    auth0_id text unique not null,
    name varchar (100),
    email varchar (100),
    picture text not null
);

create table if  not exists memes (
    id serial primary key,
    url text not null,
    user_id integer references users(id)
);

insert into memes(url)
values('https://qph.fs.quoracdn.net/main-qimg-d7076e702d3a13273845fc3b3bd7d789-c');

