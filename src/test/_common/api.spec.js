import React from 'react';
import { assert, expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import api, { firebase } from '../../_common/api';
// import * as firebase from 'firebase/auth';

describe('<Layout />', () =>{
  describe('#getCurrentUser', () => {
    it('calls firebase getAuth method', () => {
      const final = 'test_user';

      firebase.getAuth = sinon.stub().returns({currentUser: final});

      const result = api().getCurrentUser();
      sinon.assert.calledOnce(firebase.getAuth);
      expect(result).to.equal(final);
    });
  });

  describe('#getDocRef', () => {
    it('calls firebase getFirestore and doc methods', () => {
      const testDocRef = 'test_doc_ref';
      const testDb = 'test_db';
      const testcollectionString = 'test_collection_string';
      const test_id = '12';

      firebase.getFirestore = sinon.stub().returns(testDb);
      firebase.doc = sinon.stub().returns(testDocRef);

      const result = api(testcollectionString).getDocRef(test_id)
      expect(firebase.doc.calledWith(
        testDb, testcollectionString, test_id
      )).to.be.true;
      expect(result).to.equal(testDocRef);
    });
  });

  describe('#getCollection', () => {
    it('calls firebase getFirestore and collection methods', () => {
      const testCollection = 'test_collection';
      const testDb = 'test_db';
      const testcollectionString = 'test_collection_string';

      firebase.getFirestore = sinon.stub().returns(testDb);
      firebase.collection = sinon.stub().returns(testCollection);

      const result = api(testcollectionString).getCollection()
      expect(firebase.collection.calledWith(
        testDb, testcollectionString
      )).to.be.true;
      expect(result).to.equal(testCollection);
    });
  });

  describe('#getById', () => {
    it('calls firebase getDoc method', async () => {
      const testDocRef = 'test_dock_ref';
      const testDoc = 'test_doc';
      const testId = 'test_id';
      const testCollectionString = 'test_collection_string';

      const api_functions = api(testCollectionString);
      api_functions.getDocRef = sinon.stub().returns(testDocRef);
      firebase.getDoc = sinon.stub().resolves(testDoc);

      const result = await api_functions.getById(testId);
      expect(result).to.equal(testDoc);
      expect(firebase.getDoc.calledOnce).to.be.true;
    });
  });

  describe('#set', () => {
    it('calls firebase setDoc method', async () => {
      firebase.setDoc = sinon.stub()
      await api().set('test_id', 'test_data');
      expect(firebase.setDoc.calledOnce).to.be.true;
    });
  });

  describe('#deleteDocument', () => {
    it('calls firebase deleteDoc method', async () => {
      firebase.deleteDoc = sinon.stub();
      await api().deleteDocument('test_id');
      expect(firebase.deleteDoc.calledOnce).to.be.true;
    });
  });
});
