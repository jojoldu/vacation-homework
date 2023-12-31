# 블랙잭 게임

아직 과제 작성중입니다.
아래 규칙은 최종 전달전까지 언제든 변할 수 있습니다.

## 규칙

### 게임의 목표

플레이어는 딜러와 대결하여 손의 총 합계가 21에 가장 가깝도록 카드를 뽑아야 합니다.  
21을 초과하면 즉시 패배합니다.

### 게임 규칙

- 딜러와 플레이어 단 2명만 존재합니다.
- 52장의 카드가 존재합니다.
  - 4가지 무늬(하트, 다이아몬드, 클럽, 스페이드) 각각에 13장의 카드(2에서 10까지의 숫자 카드, J, Q, K, A)가 포함되어 있습니다.
  - 중복된 카드는 없습니다.
- 카드 셔플링: 게임 시작 전에 덱은 섞여야 합니다.
  - 이는 카드가 무작위 랜덤으로 섞여 있음을 의미합니다.

- 게임이 시작 되면 플레이어 카드 2장, 딜러 카드 2장씩을 각각 뽑는다 (`drawCard`)
- 딜러 혹은 플레이어가 뽑은 카드의 합이 21을 초과하면 그 즉시 패배합니다.
  - 21을 초과하지 않는 동안에는 플레이어는 계속해서 카드를 뽑을 수 있습니다.
    - 이때 `yes/no` 의 **사용자 입력을 받아서 카드를 뽑을지 말지 선택**합니다.
  - 플레이어가 모두 카드를 뽑은 뒤
    - 딜러는 2개 카드의 합계 점수가 **17점 미만**이면 반드시 1장을 추가로 뽑고
    - 17점 이상이면 추가로 뽑을 수 없습니다.
- 플레이어와 딜러 모두 카드를 뽑고 나면 점수를 계산 합니다.
- 카드 점수 계산
  - 숫자 카드(2-10)는 그 숫자 그대로 점수를 가집니다.
  - J, Q, K는 10점으로 계산됩니다.
  - **에이스(A)는 1점 또는 11점으로 계산될 수 있으며, 플레이어의 점수 합계가 21을 초과하지 않는 범위에서 최대한 높은 값**을 가집니다.
  - 카드를 오픈하면 딜러와 플레이어 중 소유한 카드의 합이 21에 가장 가까운 쪽이 승리합니다.
  - 둘의 점수가 같다면 플레이어의 승리로 판정합니다.

## 게임 예시

### 1) 플레이어가 딜러보다 높을 경우

```bash
Enter your player name: 향로
Hello, Player: 향로!

게임을 시작합니다.

플레이어가 2장의 카드를 뽑습니다.
딜러가 2장의 카드를 뽑습니다.

플레이어가 보유하고 있는 카드는 [Diamonds] K, [Hearts] Q 입니다.
추가로 카드를 뽑겠습니까? (yes/no):  no
플레이어는 카드를 더이상 뽑지 않습니다.

딜러가 17미만이면 1장의 카드를 추가로 뽑습니다.

승자는 플레이어 이며 카드의 총합은 20 입니다.
패자는 딜러 이며 카드의 총합은 17 입니다.
```

### 2) 딜러 카드의 총합이 21을 초과한 경우

```bash
Enter your player name: 향로
Hello, Player: 향로!

게임을 시작합니다.

플레이어가 2장의 카드를 뽑습니다.
딜러가 2장의 카드를 뽑습니다.

플레이어가 보유하고 있는 카드는 [Diamonds] 7, [Hearts] Q 입니다.
추가로 카드를 뽑겠습니까? (yes/no):  no
플레이어는 카드를 더이상 뽑지 않습니다.

딜러가 17미만이면 1장의 카드를 추가로 뽑습니다.

승자는 플레이어 이며 카드의 총합은 17 입니다.
패자는 딜러 이며 카드의 총합은 0 입니다.
```

### 3) 딜러가 플레이어보다 높을 경우

```bash
Enter your player name: 향로
Hello, Player: 향로!

게임을 시작합니다.

플레이어가 2장의 카드를 뽑습니다.
딜러가 2장의 카드를 뽑습니다.

플레이어가 보유하고 있는 카드는 [Clubs] 7, [Clubs] K 입니다.
추가로 카드를 뽑겠습니까? (yes/no):  no
플레이어는 카드를 더이상 뽑지 않습니다.

딜러가 17미만이면 1장의 카드를 추가로 뽑습니다.

승자는 플레이어 이며 카드의 총합은 20 입니다.
패자는 딜러 이며 카드의 총합은 17 입니다.
```

### 4) 플레이어 카드의 총합이 21을 초과한 경우

```bash
Enter your player name: 향로
Hello, Player: 향로!

게임을 시작합니다.

플레이어가 2장의 카드를 뽑습니다.
딜러가 2장의 카드를 뽑습니다.

플레이어가 보유하고 있는 카드는 [Diamonds] 7, [Hearts] Q 입니다.
추가로 카드를 뽑겠습니까? (yes/no):  yes
플레이어가 카드를 한장 뽑습니다.

플레이어가 보유하고 있는 카드는 [Diamonds] 7, [Hearts] Q, [Hearts] 9 입니다.
추가로 카드를 뽑겠습니까? (yes/no):  no
플레이어는 카드를 더이상 뽑지 않습니다.

플레이어의 카드 점수가 21점을 초과하였습니다. Player's score=26

승자는 딜러 이며 카드의 총합은 18 입니다.
패자는 플레이어 이며 카드의 총합은 0 입니다.

```

PR을 보내면 아래와 같이 Github Action 에서 테스트 결과를 확인할 수 있다.

![test-result](./images/test-result.png)

## 요구사항

### 필수 요구 사항

- 아래 항목들을 구현합니다.
  - `createDeck`
  - `play`
  - **그 외 이미 만들어진 코드는 수정해선 안됩니다**.
  - 위 2개 함수 외에 추가적으로 함수, 클래스는 **각 파트별 요구사항에 맞춰** 추가할 수 있습니다.
- **E2E 테스트 코드를 모두 통과해야 합니다**.
- 깨진 테스트가 존재해선 안됩니다.
- `package.json` 에 **의존성을 추가하지 않습니다**.
  - 즉, 해당 프로젝트에 npm 패키지가 추가되어선 안됩니다.
- `console.log` 는 **메인 코드(src)에서는 존재해선 안됩니다**.
  - 테스트 코드 등에서는 활용 가능합니다.
  - 출력이 필요한 경우 예제 코드에서 지원하는 `Writer` 와 `ConsoleWriter` 를 사용합니다.
- Lint, Prettier 를 따릅니다.
  - husky, Lint, Prettier 규칙을 추가하는 것은 가능하나, **수정/삭제는 안됩니다**.
- `jest.mock`, `jest.fn()` 등 **Jest에서 지원하는 Mocking은 사용할 수 없습니다**.
  - 본인이 직접 Mock, Stub, Faker 등을 구현하는 것은 가능합니다.


#### BE 필수 요구 사항

- **Class는 3개 이하로 구현**해야 합니다.
  - Class의 숫자가 적을 수록 좋습니다.
- `Interface`, `Type`, `Enum`, `Function` 을 적극적으로 사용합니다.
- **Object literal 은 사용해도 됩니다**.

#### FE 필수 요구 사항

- 모든 기능은 **Class 내부에** 존재해야 합니다.
  - 즉, 함수 (`Function`)는 없으며 메소드 (`Method`) 만 존재해야합니다.
  - [Methods and Functions](https://www.codecademy.com/article/fwd-js-methods-functions)
  - 그 외 `Interface`, `Type`, `Enum` 등은 적극적으로 사용하셔도 됩니다.
    - `Function` 의 사용만 금지 됩니다.
- **Object literal 은 사용할 수 없습니다**.

### 선택 요구 사항

- 단위 테스트 등 본인이 필요한 테스트 코드는 얼마든지 추가해도 됩니다.
- 브랜치 커버리지 100%를 목표로 해도 좋습니다.
