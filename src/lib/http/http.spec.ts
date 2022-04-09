import { expect } from 'chai';
import sinon from 'sinon';
import { Http } from './http';

describe('Http', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let http: Http;

  beforeEach(() => {
    const xhr: sinon.SinonFakeXMLHttpRequestStatic =
      sinon.useFakeXMLHttpRequest();

    (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    (global as any).FormData = class FormData {};

    xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  beforeEach(() => {
    http = new Http();
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();

    requests.length = 0;
  });

  it('send GET request', (done) => {
    http.get('https://api', { withCredentials: true, data: { search: 10 } });
    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('GET');
    expect(requests[0].withCredentials).to.eq(true);
    expect(requests[0].url).to.eq('https://api?search=10');
    done();
  });

  it('send POST request', (done) => {
    const data = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    };
    http.post('https://api', { data: JSON.stringify(data) });
    requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      '[{ "first_name": "", "second_name": "", "login": "", "email": "", "password": "", "phone": "" }]',
    );
    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('POST');
    expect(requests[0].requestBody).to.eq(JSON.stringify(data));
    expect(requests[0].requestHeaders['content-type']).to.eq(
      'application/json;charset=utf-8',
    );
    expect(requests[0].url).to.eq('https://api');
    done();
  });
  it('send PATCH request', (done) => {
    http.patch('https://api', { data: { search: 10 } });
    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('PATCH');
    expect(requests[0].url).to.eq('https://api');
    done();
  });
  it('send PUT request', (done) => {
    http.put('https://api', { data: { search: 10 } });
    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('PUT');
    expect(requests[0].url).to.eq('https://api');
    done();
  });
  it('send DELETE request', (done) => {
    http.delete('https://api', {});
    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('DELETE');
    expect(requests[0].url).to.eq('https://api');
    done();
  });
});
