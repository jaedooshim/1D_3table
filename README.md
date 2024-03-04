# 1Day-1Project

## BackEnd - 심재두

## # 프로젝트 소개
- 1D-1Project : 하루에 3~4개의 테이블로 구성하여 사이드 프로젝트를 진행
<br>
- 유저/게시글/코멘트 로 구성되어있으며 bcrypt 모듈을 만들어 OOP형식으로 적용
- 하나의 유저는 여러개의 게시글을 작성할 수 있고,해당 게시글에 대해 여러개의 댓글을 작성할 수 있다.

## Rest API
| Content    | Method   | Path                               |
|------------|----------|------------------------------------|
| 유저생성       | `POST`   | /users                             |
| 유저수정       | `PUT`    | /users/:id                         |
| 유저삭제       | `DELETE` | /users/:id                         |
| 유저조회       | `GET`    | /users/:id                         |
| 유저목록조회     | `GET`    | /users                             |
| 게시글 생성     | `POST`   | /posts                             |
| 게시글 수정     | `PUT`    | /posts/:postId                     |
| 게시글 삭제     | `DELETE` | /posts/:postId                     |
| 게시글 조회     | `GET`    | /posts/:postId                     |
| 게시글 목록조회   | `GET`    | /posts                             |
| 게시글 댓글생성   | `POST`   | /posts/:postId/comments            |
| 게시글 댓글수정   | `PATCH`  | /posts/:postId/comments/:commentId |
| 게시글 댓글삭제   | `DELETE` | /posts/:postId/comments/:commentId |
| 게시글 댓글목록조회 | `GET`    | /posts/comments                    |

### 사용기술

- TypeScript
- NestJs
- Prisma
- PostgreSQL
- Docker



### Server Use

```bash
npm run start:dev
```

### Install
```angular2html
npm i | npm install
```

### Docker PostgreServer Port
```angular2html
5432:5432
```