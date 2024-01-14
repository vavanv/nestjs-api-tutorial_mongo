import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';

// import { PrismaService } from '../src/prisma/prisma.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../src/modules/app/app.module';
import { AuthPayload } from 'src/modules/auth/payload';
import { EditUserPayload } from 'src/modules/user/payload';
import {
  CreateBookmarkPayload,
  EditBookmarkPayload,
} from 'src/modules/bookmark/payload';

describe('App e2e', () => {
  let app: INestApplication;
  // let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    // prismaService = app.get(PrismaService);
    // await prismaService.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const payload: AuthPayload = {
      email: 'vladimir.vv@gmail.com',
      password: '123',
      firstName: 'V',
      lastName: 'V',
    };
    describe('Signup', () => {
      it('Should Throw if email is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            ...payload,
            email: 'vladimir.vv',
          })
          .expectStatus(400);
      });
      it('Should Throw if password is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            ...payload,
            password: '',
          })
          .expectStatus(400);
      });
      it('Should Throw if credentials are not provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(payload)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('Should Throw if email is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            ...payload,
            email: 'vladimir.vv',
          })
          .expectStatus(400);
      });
      it('Should Throw if password is not valid', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            ...payload,
            password: '',
          })
          .expectStatus(400);
      });
      it('Should Throw if credentials are not provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should Signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(payload)
          .expectStatus(200)
          .stores('access_token', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get Me', () => {
      it('Should Get Me', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      it('Should Edit User', () => {
        const dto: EditUserPayload = {
          email: 'vvv@gmail.com',
          firstName: 'Vlad',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Bookmark', () => {
    describe('Get Empty Bookmarks', () => {
      it('Should Get Bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create Bookmark', () => {
      const payload: CreateBookmarkPayload = {
        title: 'Google',
        link: 'https://google.com',
      };
      it('Should Create Bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .withBody(payload)
          .expectStatus(201)
          .expectBodyContains(payload.title)
          .expectBodyContains(payload.link)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get Bookmarks', () => {
      it('Should Get Bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get Bookmark By Id', () => {
      it('Get Bookmarks By Id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams({
            id: '$S{bookmarkId}',
          })
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
        // .inspect();
      });
    });
    describe('Edit Bookmark By Id', () => {
      const payload: EditBookmarkPayload = {
        title: 'Title Google',
        description: 'Description Google',
      };
      it('Edit Bookmarks By Id', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams({
            id: '$S{bookmarkId}',
          })
          .withBody(payload)
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200)
          .expectBodyContains(payload.title)
          .expectBodyContains(payload.description);
      });
    });
    describe('Delete Bookmark By Id', () => {
      it('Delete Bookmarks By Id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams({
            id: '$S{bookmarkId}',
          })
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(204);
      });

      it('Should Get Bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
