import React from 'react'
import styled from 'styled-components'
import { media } from '@lib/styles/media'

function Guide() {
  return (
    <StyledGuide>
      <div className={'guide_text_wrap'}>
        <div className={'guide_title'}>째깍악어 회의실 예약</div>
        <div className={'guide_desc'}>예약시간 외 준비/정리시간은 추가 제공되지 않습니다.</div>
      </div>
      <Line />
      <div className={'guide_notice'}>
        <div>
          <div>-</div> 캘린더에 원하는 시작시간을 클릭하시면 예약이 가능합니다.
        </div>
        <div>
          <div>-</div> 예약취소는 시작시간 <span>10분전까지</span> 가능합니다.
        </div>
      </div>
    </StyledGuide>
  )
}

export default Guide

const StyledGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding-top: 20px;

  ${media.mobile} {
    align-items: center;
  }

  .guide_text_wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .guide_title {
      font-size: 25px;
      font-weight: 700;
      margin-bottom: 20px;
      color: ${({ theme }) => theme.color.gray5};
    }

    .guide_desc {
      font-size: 17px;
      font-weight: 500;
      color: ${({ theme }) => theme.color.gray5};
      margin-bottom: 10px;
    }
  }

  .guide_notice {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-top: 20px;
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray3};

    span {
      color: ${({ theme }) => theme.color.destructive};
    }

    > div {
      display: flex;
      column-gap: 10px;
    }
  }
`

const Line = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.color.gray0};
`
