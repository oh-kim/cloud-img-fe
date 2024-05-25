# CLOUD-IMG-FE

## 데이터 처리는 언제나 어려워

### 문제설명 what the hell is ‘`application/octet-stream`’

→ 이미지 업로드와 지도 상태를 업데이트 하기 위한 쿼리를 백엔드에 보내야 하는 상황.

→ `FormData` 객체를 활용해 selectedImage + detail 합치는 순간 백엔드에서 데이터 타입을 `application/octet-stream` 을 리턴 및 오류.

---

### ⍺ 접근

- 이미지 파일과 일반 텍스트가 동시에 들어가기 때문에 http 프로토콜에서 ‘content-type’ `multipart/form-data` 을 주면 해결 될 것이라고 생각.

**과정 및 결과**

- `FormData` 객체가 받는 데이터에 따라 해당 content type을 설정해주는데, 위와 같은 방법으로 `content-type` 을 명시하는 순간 뒤에 `—boundary ~` 부분 없어지면서 에러 발생..

### ß 접근

- 그렇다면 방법은 detail 항목의 데이터 타입을 맞춰줘서 백엔드 서버에서 받게 해야되는데..
- `application/json` 형태로 바꾸려면 어떤 방법이 있을까
  1. detail 항목의 content-type이 바이너리로 가는데 이녀석의 타입을 바꿔주면 될거 같은데

**과정 및 결과**

- 컴파일 타임에서 타입수정 X
- 바이너리 데이터 타입을 수정할 방법? → Blob
- Blob 객체의 경우 데이터 타입을 직접 수정가능 -> `application/json` 강제 -> 성공🔥

  ```ts
  const boardDTO = new Blob(
    [
      JSON.stringify({
        title: detail.title,
        content: detail.content,
        maxLat: mapInfo?.max.maxLat,
        maxLng: mapInfo?.max.maxLng,
        lat: mapInfo?.center.centerLat,
        lng: mapInfo?.center.centerLng,
      }),
    ],
    { type: "application/json" }
  );

  formData.append("boardDto", boardDTO);
  ```

---

## 최적화 나도 한번 해보자

### situation

- file upload 후, title, content에 해당하는 항목이 변경될때 마다 아래 바뀌지 않는 fileList가 계속해서 네트워크 탭에 blob 처리되는것을 볼수 있었다.
- 뚜렷한 성능 저하는 없었지만, 장기적으로 다수의 사진을 업로드하는 경우 또 값이 바뀌는 경우 성능 저하 염두

### a 접근

- 해당 이미지 프리뷰 컴포넌트를 분리해서 해당 Props을 메모이제이션을 한다면 해결 가능 할 듯 -> success🔥

```ts
import { memo } from "react";

const FilePreview = memo(({ selectedImages }: { selectedImages: File[] }) => {
  return (
    <ul className='h-full grid gap-2 lg:grid-flow-col lg:grid-rows-3'>
      {selectedImages.map((image) => {
        const imageURL = URL.createObjectURL(image);

        return (
          <li
            key={image.name}
            className='h-40 w-full flex justify-center items-center'
          >
            <img
              src={imageURL}
              className='h-full object-cover rounded-md'
            ></img>
          </li>
        );
      })}
    </ul>
  );
});

export default FilePreview;
```

# naver map api

- script로 import
  `const {naver} = window;`

NaverMap ref를 통해 관리 지속적으로 해당 DOM에 접근해야하기 때문
