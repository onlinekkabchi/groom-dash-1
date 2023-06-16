console.log("map");

window.onload = function () {
  const app = document.querySelector("#app");

  const container = document.querySelector("#map");
  // container.style.width = "500px";
  // container.style.height = "200px";
  // container.style.paddingTop = "10px";

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  app.appendChild(container);
  // 지도에 표시할 원을 생성합니다
  var circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 원의 중심좌표 입니다
    radius: 50, // 미터 단위의 원의 반지름입니다
    strokeWeight: 5, // 선의 두께입니다
    strokeColor: "#75B8FA", // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "dashed", // 선의 스타일 입니다
    fillColor: "#CFE7FF", // 채우기 색깔입니다
    fillOpacity: 0.7, // 채우기 불투명도 입니다
  });

  // 지도에 원을 표시합니다
  circle.setMap(map);
};
