MATCH (all)
DETACH DELETE all;


CREATE(group:Group {groupId: "jane's_lab_ed5fd39c-15a4-461c-bdcc-989ee5ffadad", name: "Jan's Lab"});

CREATE(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2', name: 'Abelota-Lab'});

CREATE(user:User {username: 'testuser'});

CREATE(user:User {username: 'abigaill'});

CREATE(user:User {username: 'adalee'});

CREATE(user:User {username: 'abelota'});

MATCH(group:Group {groupId: "jane's_lab_ed5fd39c-15a4-461c-bdcc-989ee5ffadad"})
MATCH(user:User {username: 'testuser'})
CREATE(user)-[:MEMBER_OF {membership: 'owner'}]->(group);

MATCH(group:Group {groupId: "jane's_lab_ed5fd39c-15a4-461c-bdcc-989ee5ffadad"})
MATCH(user:User {username: 'abigaill'})
CREATE(user)-[:MEMBER_OF {membership: 'member'}]->(group);

MATCH(group:Group {groupId: "jane's_lab_ed5fd39c-15a4-461c-bdcc-989ee5ffadad"})
MATCH(user:User {username: 'adalee'})
CREATE(user)-[:MEMBER_OF {membership: 'member'}]->(group);


MATCH(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2'})
MATCH(user:User {username: 'testuser'})
CREATE(user)-[:MEMBER_OF {membership: 'member'}]->(group);

MATCH(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2'})
MATCH(user:User {username: 'adalee'})
CREATE(user)-[:MEMBER_OF {membership: 'member'}]->(group);

MATCH(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2'})
MATCH(user:User {username: 'abelota'})
CREATE(user)-[:MEMBER_OF {membership: 'owner'}]->(group);


CREATE(collection:Collection {
  collectionId:  1, name: 'testuser-05-10-2021-22-19', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})
CREATE(:Dataset {
  datasetId:     1, name: 'file-1.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     2, name: 'file-2.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     3, name: 'file-3.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     4, name: 'file-4.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     5, name: 'file-5.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     6, name: 'file-6.png', owner: 'testuser', createdAt: datetime(), createdBy: 'testuser',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'testuser'})-[:CHILD_OF]->(collection);

MATCH(collection:Collection {collectionId: 1})
MATCH(user:User {username: 'testuser'})
CREATE(user)-[:HAS_PERMISSION {access: 'owner'}]->(collection);

MATCH(collection:Collection {collectionId: 1})
MATCH(group:Group {groupId: "jane's_lab_ed5fd39c-15a4-461c-bdcc-989ee5ffadad"})
CREATE(group)-[:HAS_PERMISSION {access: 'view'}]->(collection);

CREATE(collection:Collection {
  collectionId:  2, name: 'abelota-05-10-2021-22-19', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})
CREATE(:Dataset {
  datasetId:     7, name: 'file-1.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     8, name: 'file-2.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     9, name: 'file-3.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     10, name: 'file-4.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     11, name: 'file-5.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     12, name: 'file-6.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection);


CREATE(collection:Collection {
  collectionId:  3, name: 'abelota-05-10-2021-22-57', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})
CREATE(:Dataset {
  datasetId:     13, name: 'xxhhhhdhdhd-1.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     14, name: 'xxhhhhdhdhd-2.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     15, name: 'xxhhhhdhdhd-3.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     16, name: 'xxhhhhdhdhd-4.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     17, name: 'xxhhhhdhdhd-5.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     18, name: 'xxhhhhdhdhd-6.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     19, name: 'xxhhhhdhdhd-7.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     20, name: 'xxhhhhdhdhd-8.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     21, name: 'xxhhhhdhdhd-9.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     22, name: 'xxhhhhdhdhd-10.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     23, name: 'xxhhhhdhdhd-11.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     24, name: 'xxhhhhdhdhd-12.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     25, name: 'xxhhhhdhdhd-13.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     26, name: 'xxhhhhdhdhd-14.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection);

CREATE(collection:Collection {
  collectionId:  4, name: 'abelota-05-10-2021-24-13', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})
CREATE(:Dataset {
  datasetId:     27, name: 'brain-1.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     28, name: 'brain-2.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     29, name: 'brain-3.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     30, name: 'brain-4.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     31, name: 'brain-5.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     32, name: 'brain-6.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     33, name: 'brain-7.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     34, name: 'brain-8.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection)
CREATE(:Dataset {
  datasetId:     35, name: 'brain-9.png', owner: 'abelota', createdAt: datetime(), createdBy: 'abelota',
  lastUpdatedAt: datetime(), lastUpdatedBy: 'abelota'})-[:CHILD_OF]->(collection);

MATCH(collection:Collection {collectionId: 2})
MATCH(user:User {username: 'abelota'})
CREATE(user)-[:HAS_PERMISSION {access: 'owner'}]->(collection);

MATCH(collection:Collection {collectionId: 2})
MATCH(user:User {username: 'testuser'})
CREATE(user)-[:HAS_PERMISSION {access: 'edit'}]->(collection);

MATCH(collection:Collection {collectionId: 2})
MATCH(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2'})
CREATE(group)-[:HAS_PERMISSION {access: 'view'}]->(collection);

MATCH(collection:Collection {collectionId: 3})
MATCH(user:User {username: 'abelota'})
CREATE(user)-[:HAS_PERMISSION {access: 'owner'}]->(collection);

MATCH(collection:Collection {collectionId: 3})
MATCH(group:Group {groupId: 'abelota-lab_090d6c8b-7cfd-4f8a-afaf-0730a2320ff2'})
CREATE(group)-[:HAS_PERMISSION {access: 'edit'}]->(collection);

MATCH(collection:Collection {collectionId: 4})
MATCH(user:User {username: 'abelota'})
CREATE(user)-[:HAS_PERMISSION {access: 'owner'}]->(collection);

MATCH(collection:Collection {collectionId: 4})
MATCH(user:User {username: 'abigaill'})
CREATE(user)-[:HAS_PERMISSION {access: 'edit'}]->(collection);

MATCH(collection:Collection {collectionId: 4})
MATCH(user:User {username: 'testuser'})
CREATE(user)-[:HAS_PERMISSION {access: 'read'}]->(collection);

CREATE(collectionGroup:CollectionGroup {collectionGroupId: 1, name: 'Brain Image Paper'});

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 1})
MATCH(collection:Collection {collectionId: 4})
CREATE(collection)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 1})
MATCH(dataset:Dataset {datasetId: 24})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 1})
MATCH(dataset:Dataset {datasetId: 25})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 1})
MATCH(dataset:Dataset {datasetId: 26})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);


CREATE(collectionGroup:CollectionGroup {collectionGroupId: 2, name: 'Tumor Classification Project'});

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(collection:Collection {collectionId: 1})
CREATE(collection)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(collection:Collection {collectionId: 2})
CREATE(collection)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 16})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 17})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 24})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 28})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 31})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);

MATCH(collectionGroup:CollectionGroup {collectionGroupId: 2})
MATCH(dataset:Dataset {datasetId: 35})
CREATE(dataset)-[:CHILD_OF]->(collectionGroup);




