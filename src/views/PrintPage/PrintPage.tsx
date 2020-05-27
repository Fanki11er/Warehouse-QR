import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebaseConfig';
import { Tag } from '../../classes/classes';
import { tagsPath } from '../../firebase/firebaseEndpoints';
import ItemTag from '../../components/atoms/ItemTag/ItemTag';
import ErrorInfo from '../../components/atoms/ErrorInfo/ErrorInfo';
import LoadingImage from '../../components/atoms/LoadingImage/LoadingImage';
import Navigation from '../../components/molecules/Navigation/Navigation';
import MenuButton from '../../components/atoms/MenuButton/MenuButton';

const StyledWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
`;
const StyledPage = styled.div`
  display: flex;
  flex-flow: wrap row;
  align-content: center;
  justify-content: center;
  margin: 30px;
  width: 180mm;
  height: 275mm;
  background-color: #ddd;
  @media (max-width: 600px) {
    height: 277mm;
    transform: scale(0.5);
    margin: -220px 20px;
    padding: 25px 0;
  }
`;

const StyledLoading = styled.div`
  display: flex;
  padding: 100px;
  align-self: center;
  justify-self: center;
`;

const StyledErrorInfo = styled(ErrorInfo)`
  color: black;
  margin: 30px 0;
`;

const StyledMenuButton = styled(MenuButton)`
  margin-top: 45px;
`;

const PrintPage = () => {
  const [isStoreEmpty, setIsStoreEmpty] = useState<boolean | undefined>(undefined);
  const [tagsList, setTagsList] = useState<Tag[]>([]);
  const [pagesList, setPagesList] = useState<Array<Tag>[]>([]);
  const [printer, setPrinter] = useState(true);

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

  const spliceForPages = (tagsList: Tag[]): Array<Tag>[] => {
    const list = [...tagsList];
    const LIMIT = 20;
    const pages: Array<Tag>[] = [];
    do {
      const page = list.splice(0, LIMIT);
      pages.push(page);
    } while (list.length > 0);
    return pages;
  };

  const changePrinter = () => {
    setPrinter(!printer);
  };

  useEffect(() => {
    tagsList.length && setPagesList(spliceForPages(tagsList));
  }, [tagsList]);

  const renderTags = (tagsList: Tag[]) => {
    return tagsList.map((itemTag, index) => {
      return <ItemTag itemTag={itemTag} key={index} />;
    });
  };

  const renderPages = (pagesList: Array<Tag>[]) => {
    return pagesList.length ? (
      pagesList.map((page, index) => {
        return (
          <StyledPage className={printer ? 'pagePrinter' : 'pagePdf'} key={index}>
            {renderTags(page)}
          </StyledPage>
        );
      })
    ) : (
      <StyledLoading>
        <LoadingImage customWidth={100} />
      </StyledLoading>
    );
  };
  return (
    <StyledWrapper>
      <Navigation />
      <StyledMenuButton onClick={() => changePrinter()} className={'printHide'}>
        {printer ? 'PRINTER' : 'PDF'}
      </StyledMenuButton>
      {isStoreEmpty === true ? (
        <StyledErrorInfo>Brak elementów do wyświetlenia</StyledErrorInfo>
      ) : (
        renderPages(pagesList)
      )}
    </StyledWrapper>
  );
};

export default PrintPage;
