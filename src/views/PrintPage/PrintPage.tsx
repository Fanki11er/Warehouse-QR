import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { Tag } from '../../classes/classes';
import { tagsPath } from '../../firebase/firebaseEndpoints';
import ItemTag from '../../components/atoms/ItemTag/ItemTag';
import ErrorInfo from '../../components/atoms/ErrorInfo/ErrorInfo';
import LoadingImage from '../../components/atoms/LoadingImage/LoadingImage';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
`;
const StyledPage = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-content: flex-start;
  margin: 20px;
  width: 180mm;
  height: 260mm;
  background-color: #bbb;
`;

const StyledLoading = styled.div`
  display: flex;
  padding: 100px;
  align-self: center;
  justify-self: center;
  margin-left: 150px;
`;

const StyledErrorInfo = styled(ErrorInfo)`
  color: black;
  margin: 30px 0;
`;

const PrintPage = () => {
  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [tagsList, setTagsList] = useState<Tag[]>([]);

  useEffect(() => {
    //!! Info about useCallback
    const loadItemsList = (tagsPath: string) => {
      return db.ref(tagsPath).on('value', async (snapshot) => {
        const isEmpty =
          isStoreEmpty === undefined ? (await snapshot.val()) === 'EMPTY' : isStoreEmpty;
        setIsStoreEmpty(isEmpty);
        if (!isEmpty) {
          const items = await snapshot.val();

          setTagsList(Object.values(items));
        }
      });
    };
    const listener = loadItemsList(tagsPath);
    return () => db.ref(tagsPath).off('value', listener);
  }, [isStoreEmpty]);

  const renderTags = (tagsList: Tag[]) => {
    return tagsList.length ? (
      tagsList.map((itemTag, index) => {
        return <ItemTag itemTag={itemTag} key={index} />;
      })
    ) : (
      <StyledLoading>
        <LoadingImage customWidth={100} />
      </StyledLoading>
    );
  };
  return (
    <StyledWrapper>
      <StyledPage>
        {isStoreEmpty === true ? (
          <StyledErrorInfo>Brak elementów do wyświetlenia</StyledErrorInfo>
        ) : (
          renderTags(tagsList)
        )}
      </StyledPage>
    </StyledWrapper>
  );
};

export default PrintPage;
