/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     20.11.2015 12:04:31                          */
/*==============================================================*/


/*==============================================================*/
/* Table: cart_item                                             */
/*==============================================================*/
create table cart_item (
   id                   BIGSERIAL            not null,
   ref_user             INT8                 not null,
   ref_lot              INT8                 not null,
   datetime             TIMESTAMP WITH TIME ZONE not null,
   constraint PK_CART_ITEM primary key (id)
);

/*==============================================================*/
/* Index: i_cart_item_ref_lot                                   */
/*==============================================================*/
create unique index i_cart_item_ref_lot on cart_item using BTREE (
ref_lot
);

/*==============================================================*/
/* Index: i_cart_item_ref_user                                  */
/*==============================================================*/
create  index i_cart_item_ref_user on cart_item using BTREE (
ref_user
);

/*==============================================================*/
/* Table: lot                                                   */
/*==============================================================*/
create table lot (
   id                   BIGSERIAL            not null,
   datetime             TIMESTAMP WITH TIME ZONE not null,
   name                 TEXT                 not null,
   description          TEXT                 null,
   hidden               BOOL                 not null,
   price                NUMERIC              not null,
   ref_user             INT8                 not null,
   constraint PK_LOT primary key (id)
);

/*==============================================================*/
/* Index: i_lot_datetime                                        */
/*==============================================================*/
create  index i_lot_datetime on lot using BTREE (
datetime
);

/*==============================================================*/
/* Table: role                                                  */
/*==============================================================*/
create table role (
   id                   BIGSERIAL            not null,
   name                 TEXT                 not null,
   constraint PK_ROLE primary key (id)
);

/*==============================================================*/
/* Index: i_role_name                                           */
/*==============================================================*/
create unique index i_role_name on role using BTREE (
name
);

/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table "user" (
   id                   BIGSERIAL            not null,
   name                 TEXT                 not null,
   password             TEXT                 not null,
   salt                 TEXT                 not null,
   constraint PK_USER primary key (id)
);

/*==============================================================*/
/* Index: i_user_name                                           */
/*==============================================================*/
create unique index i_user_name on "user" using BTREE (
name
);

/*==============================================================*/
/* Table: user_to_role                                          */
/*==============================================================*/
create table user_to_role (
   ref_user             INT8                 not null,
   ref_role             INT8                 not null,
   constraint PK_USER_TO_ROLE primary key (ref_user, ref_role)
);

alter table cart_item
   add constraint FK_CART_ITE_REFERENCE_USER foreign key (ref_user)
      references "user" (id)
      on delete cascade on update cascade;

alter table cart_item
   add constraint FK_CART_ITE_REFERENCE_LOT foreign key (ref_lot)
      references lot (id)
      on delete cascade on update cascade;

alter table lot
   add constraint FK_LOT_REFERENCE_USER foreign key (ref_user)
      references "user" (id)
      on delete cascade on update cascade;

alter table user_to_role
   add constraint c_Reference_7 foreign key (ref_role)
      references role (id)
      on delete cascade on update cascade;

alter table user_to_role
   add constraint FK_USER_TO__REFERENCE_USER foreign key (ref_user)
      references "user" (id)
      on delete cascade on update cascade;

