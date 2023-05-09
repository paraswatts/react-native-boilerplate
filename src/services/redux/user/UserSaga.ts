import { takeEvery, put } from 'redux-saga/effects'
import { API, getRequest, postRequest, putRequest } from '@api'
import { sagaActions } from './UserActions'
import { hideLoading, setCurrentApiEvent, setCurrentEvent, setUserEvents, showLoading } from './UserReducers'
import UserService from '@screens/home/services/userService';

export function* fetchUserEventsSaga(action: any) {
  try {
    yield put(showLoading());
    const { data, status } = yield getRequest({
      API: `${API.USER_EVENTS}${action.payload.userId}`,
    });

    if (status === 200) {
      yield put(setUserEvents(data?.event))
    }

    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
    yield put(hideLoading());
  }
}

export function* fetchSingleEvent(action: any) {
  try {
    yield put(showLoading());
    const { data, status } = yield getRequest({
      API: `${API.EVENTS}${action.payload.eventId}`,
    });
    if (status === 200) {
      yield put(setCurrentEvent(data))
    }
    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
    yield put(hideLoading());
  }
}

export function* addEvent({ payload: {
  requestData,
  onSuccess = (data: any) => { }
} }) {
  try {
    yield put(showLoading());
    const { data, status } = yield postRequest({
      API: API.EVENTS,
      DATA: { ...requestData }
    });
    if (status === 200) {
      onSuccess(data)
    }
    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
  }
}

export function* updateEvent({ payload: {
  requestData,
  onSuccess = (data: any) => { }
} = {}
}) {
  try {
    yield put(showLoading());
    const { data, status } = yield putRequest({
      API: `${API.EVENTS}${requestData.eventId}`,
      DATA: { ...requestData }
    });

    if (status === 200) {
      onSuccess(data)
    }

    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
  }
}

export function* getEvent(action: any) {
  try {
    yield put(showLoading());
    const { data, status } = yield getRequest({
      API: `${API.EVENTS}${action.payload.eventId}`
    });
    if (status === 200) {
      yield put(setCurrentApiEvent(data))
    }
    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
    yield put(hideLoading());
  }
}


export function* uploadImage({ payload: {
  requestData,
  onSuccess = () => { },
  onFailure = () => { }
} }) {
  try {
    yield put(showLoading());
    const formData = new FormData();
    const file = {
      name: "TestFile",
      uri: requestData.file?.path,
      type: requestData.file?.mime
    }

    formData.append('file', file);
    const { status } = yield postRequest({
      API: `${API.UPLOAD_IMAGE}${requestData.objectId}`,
      DATA: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    if (status === 200) {
      onSuccess();
    }
    else if (status === 401) {
      UserService.logout();
    }
    else {
      onFailure();
    }
  } catch (e) {
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
    yield put(hideLoading());
  }
}

export function* addComment(action: any) {
  try {
    yield put(showLoading());
    const { status } = yield postRequest({
      API: `${API.EVENTS}${action.payload?.eventId}/${API.COMMENTS}`,
      DATA: { ...action.payload.data }
    });
    if (status === 200) {
      yield put({ type: sagaActions.GET_EVENT, payload: { eventId: action.payload?.eventId } })
    }
    if (status === 401) {
      UserService.logout();
    }
  } catch (e) {
    yield put(hideLoading());
    yield put({ type: 'EVENTS_SAGA_FAILED' })
  }
  finally {
  }
}

export default function* userSaga() {
  yield takeEvery(sagaActions.FETCH_USER_EVENTS, fetchUserEventsSaga)
  yield takeEvery(sagaActions.ADD_EVENT, addEvent)
  yield takeEvery(sagaActions.UPDATE_EVENT, updateEvent)
  yield takeEvery(sagaActions.GET_EVENT, getEvent)
  yield takeEvery(sagaActions.UPLOAD_IMAGE, uploadImage)
  yield takeEvery(sagaActions.ADD_COMMENT, addComment)
}