import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const BaseLabel = styled.span`
  width: 23%;
`;

export const Name = styled(BaseLabel)``;
export const Quantity = styled(BaseLabel)`
  display: flex;
`;
export const Price = styled(BaseLabel)``;

export const Arrow = styled(Quantity)`
  cursor: pointer;
`;

export const Value = styled(Quantity)`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
