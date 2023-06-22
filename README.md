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

[apm-server-tester-1, google app engine 사용](https://apm-server-tester-1.du.r.appspot.com/)

## 참고개념

**Unprojection**

Here is our magical transformation to 3D World: Unprojection. In reality, the 3D world on a computer screen is a myth - it does not exist on your screen because your screen can only display 2D images. So, how does it work? All rendering engines are using 3D worlds to estimate where the objects are and how far they are from the viewport and then apply shaders and all post-processing calculations. But at the very end of these processes, there is a Project function (or transformation) that converts a 3D World to a 2D Rasterized image from a viewport. These images are also called frames. If we run this whole process multiple times per second, we will experience the real 3D world on our computer screen. In our case, we must go backwards - we have normalized screen coordinates and we must unproject them back to the 3D world. This is why Unprojection was used.

## 참고링크

- [Hand landmark detection using the MediaPipe HandLandmarker task, Codepen](https://codepen.io/mediapipe-preview/pen/gOKBGPN?editors=1010)
- [javascript mvc todo list, mvc패턴 참고](https://www.taniarascia.com/javascript-mvc-todo-app/)
- [task.vision, google developers](https://developers.google.com/mediapipe/api/solutions/python/mp/tasks/vision)
- [vision/hand_landmarker, github](https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md)
- [mediapipe-ar-library augmented reality](https://sudolabs.com/blog/augmented-reality-mediapipe-google-s-ar-library)
