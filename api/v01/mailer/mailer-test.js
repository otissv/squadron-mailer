'use strict';

import test from 'tape';
import env from '../../../server/env/development-env';
import fetch from '../../../utils/utils-fetch-test';
import { mailersMock } from './mailer-mocks';

const API_URL = `${env.baseURL}/v01/graphql`;


test('Mailer controller', nested => {
  nested.test('mailerFind method: ', assert => {
    const method = 'mailerFind';

    const query = {
      query:`
      {
        ${method} {

        }
      }`
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = mailersMock;

        assert.deepEquals(actaul, expect,
          'Find all messages');
      }
    });

    assert.end();
  });


  nested.test('mailerFindByFrom method: ', assert => {
    const method = 'mailerFindByFrom';
    const query_key = 'from';

    const $query_key = `$${query_key}`;
    const query_var = mailersMock[0][query_key];

    const query = {
      query:`query ${method}(${$query_key}: String) {
        ${method} (${query_key}: ${$query_key}) {
          id
          date
          from
          service
          subject
          html
          text
          to
          date
        }
      }`,
      variables: `{
        "${query_key}": "${query_var}"
      }`
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = mailersMock[0];

        assert.deepEquals(actaul, expect,
          'Find messages by from');
      }
    });

    assert.end();
  });


  nested.test('mailerFindById method: ', assert => {
    const method = 'mailerFindById';
    const query_key = 'id';

    const $query_key = `$${query_key}`;
    const query_var = mailersMock[0][query_key];

    const query = {
      query:`query ${method}(${$query_key}: String) {
        ${method} (${query_key}: ${$query_key}) {
          id
          date
          from
          service
          subject
          html
          text
          to
          date
        }
      }`,
      variables: `{
        "${query_key}": "${query_var}"
      }`
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = [mailersMock[0]];

        assert.deepEquals(actaul, expect,
          'Find messages by id');
      }
    });

    assert.end();
  });


  nested.test('mailerFindByTo method: ', assert => {
    const method = 'mailerFindByTo';
    const query_key = 'to';

    const $query_key = `$${query_key}`;
    const query_var = mailersMock[0][query_key];

    const query = {
      query:`query ${method}(${$query_key}: String) {
        ${method} (${query_key}: ${$query_key}) {
          id
          date
          from
          service
          subject
          html
          text
          to
          date
        }
      }`,
      variables: `{
        "${query_key}": "${query_var}"
      }`
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = mailersMock[0];

        assert.deepEquals(actaul, expect,
          'Find messages by to');
      }
    });

    assert.end();
  });


  nested.test('mailerFindByService method: ', assert => {
    const method = 'mailerFindByService';
    const query_key = 'service';

    const $query_key = `$${query_key}`;
    const query_var = mailersMock[0][query_key];

    const query = {
      query:`query ${method}(${$query_key}: String) {
        ${method} (${query_key}: ${$query_key}) {
          id
          date
          from
          service
          subject
          html
          text
          to
          date
        }
      }`,
      variables: `{
        "${query_key}": "${query_var}"
      }`
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = mailersMock[0];

        assert.deepEquals(actaul, expect,
          'Find messages by service');
      }
    });

    assert.end();
  });


  nested.test('mailerSend method: ', assert => {
    const method = 'mailerSend';
    const data = {
      "date": "2016-09-07T20:26:41.925Z",
      "from": "otis@kolabdigital.com",
      "service": "my_app",
      "subject": "this is the subject",
      "html": "<b>At worrk</b>",
      "text": "Otis sent a message",
      "to": "otis@gmail.com"
    }

    const query = {
      query:`mutation ${method}(
        $date   : String
        $from   : String,
        $service: String,
        $subject: String,
        $html   : String,
        $text   : String,
        $to     : String,
      ) {
        ${method} (
          date: $date
          from: $from
          service: $service
          subject: $subject
          html: $html
          text: $text
          to: $to
        ) {
          date
          from
          service
          subject
          html
          text
          to
          date
        }
      }`,
      variables: `{
        "date": "2016-09-07T20:26:41.925Z",
        "from": "otis@kolabdigital.com",
        "service": "my_app",
        "subject": "this is the subject",
        "html": "<b>At worrk</b>",
        "text": "Otis sent a message",
        "to": "otis@gmail.com"
      }`,
      persist: true
    };

    fetch({
      method: 'post',
      url   : API_URL,
      data: query,
      assert: (response) => {
        const actaul = response.data[method];
        const expect = {
          "date": "2016-09-07T20:26:41.925Z",
          "from": "otis@kolabdigital.com",
          "service": "my_app",
          "subject": "this is the subject",
          "html": "<b>At worrk</b>",
          "text": "Otis sent a message",
          "to": "otis@gmail.com"
        };

        assert.deepEquals(actaul, expect,
          'Send email');
      }
    });

    assert.end();
  });
});
