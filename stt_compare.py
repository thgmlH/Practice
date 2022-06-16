# This Python 3 environment comes with many helpful analytics libraries installed
# It is defined by the kaggle/python Docker image: https://github.com/kaggle/docker-python
# For example, here's several helpful packages to load

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

# Input data files are available in the read-only "../input/" directory
# For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

import os
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

# You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All" 
# You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session

####### 텍스트 유사도 측정 ######
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

naver = pd.read_csv('../input/sttcompare/stt_naver.csv', encoding='cp949')
#print(naver)
#print(naver.loc[0])
df = naver["naver_stt"]
#print(df)

clovanaver = pd.read_csv('../input/sttcompare/stt_clova.csv')
df3 = clovanaver["clova_stt"]

selvas = pd.read_csv('../input/sttcompare/stt_selvas.csv', encoding='cp949')
df1 = selvas["selvas_stt"]

stt = pd.read_csv('../input/sttcompare/stt_right.csv', encoding='cp949')
#print(stt)
df2 = stt["stt_right"]

n = []
s = []
se = []
c = []

for i in range(0, 99):
    c.append(df3.loc[i])

for i in range(0, 99):
    n.append(df.loc[i])

for i in range(0, 99):
    s.append(df2.loc[i])
    
for i in range(0, 99):
    se.append(df1.loc[i])
    
print(n[0])

from array import array
sentences = []
#compare = array()
i = 0
naver_result = []

for i in range(0, 99):
    sentences.append((c[i], s[i])) 
    #print(sentences[0])

    tfidf_vectorizer = TfidfVectorizer()
     # 문장 벡터화 하기(사전 만들기)
    tfidf_matrix = tfidf_vectorizer.fit_transform(sentences[i])

    ### 코사인 유사도 ###
    from sklearn.metrics.pairwise import cosine_similarity
    # 첫 번째와 두 번째 문장 비교
    cos_similar = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    #print("코사인 유사도 측정")
    #print(cos_similar)
    #print("================")
    naver_result.append(cos_similar[0].tolist())

#print(naver_result)
dataframe = pd.DataFrame(naver_result, columns=['similarity'])
dataframe.to_csv('./clova_result.csv', index=False, encoding='cp949')
