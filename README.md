## package.json

```
{
  "type": "module",
  "engines": {
    "node": "18.16.0"
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "@mediapipe/tasks-vision": "^0.10.2-rc2",
    "axios": "^1.4.0",
    "dotenv": "^16.1.4",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "leaflet": "^1.9.4",
    "mongodb": "^5.6.0",
    "nodemon": "^2.0.22",
    "typescript": "^5.1.3"
  }
}
```

## 배포링크

[apm-server-tester-1](https://apm-server-tester-1.du.r.appspot.com/)

- google app engine 사용

## 참고링크

- [Hand landmark detection using the MediaPipe HandLandmarker task, Codepen](https://codepen.io/mediapipe-preview/pen/gOKBGPN?editors=1010)
- [javascript mvc todo list, mvc패턴 참고](https://www.taniarascia.com/javascript-mvc-todo-app/)
- [task.vision, google developers](https://developers.google.com/mediapipe/api/solutions/python/mp/tasks/vision)
- [vision/hand_landmarker, github](https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md)
