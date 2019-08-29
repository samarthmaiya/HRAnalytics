
# coding: utf-8

# In[143]:


import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys


# In[144]:


samplesize = 201


# In[145]:


dfSkill = pd.read_csv('dice_com-job_us_sample.csv')
dfEmp = pd.read_csv('core_dataset.csv')
skill = dfSkill['skills']
emp = dfEmp[['Employee Name','Employee Number']]


# In[146]:


frame = [skill,emp]
df=pd.concat(frame,axis=1)
df = df[:samplesize]


# In[147]:


#df['skills'][26]


# In[148]:


#testData = df['skills'][26]


# In[149]:


def preprocessing(data):
    tmp = " ".join(data.split(','))
    return tmp.lower()


# In[150]:


def predictEmp(data):
    df.dropna(inplace=True)
    trainDF = df['skills']
    trainDF[0]= data
    print(trainDF.shape)
    x = trainDF.apply(preprocessing)
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(x)
    res = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
    scoreDF = pd.DataFrame(res[0],columns=['score'])
    skillsDF = pd.DataFrame(trainDF)
    frames = [scoreDF, skillsDF]
    result = pd.concat(frames,axis=1)
    empframe = [result,df['Employee Name'][1:samplesize]]
    processres = pd.concat(empframe,axis=1)
    sortres = processres.sort_values(by=['score'],ascending=False)[2:] 
    return sortres


# In[ ]:




