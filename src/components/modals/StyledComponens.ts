import styled from 'styled-components'

export const StyledCenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 10px;
  max-height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .section {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    .reservation_title {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.color.gray5};
      > span {
        margin-left: 3px;
        color: ${({ theme }) => theme.color.secondaryButtonText};
      }
    }

    .reservation_contents {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.color.gray5};
    }
  }
`
