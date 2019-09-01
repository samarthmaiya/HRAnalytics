
# coding: utf-8

# In[44]:


import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys


# In[45]:


samplesize = 201

#read from raw table
dfSkill = pd.read_csv('dice_com-job_us_sample.csv')
dfEmp = pd.read_csv('core_dataset.csv')
skill = dfSkill['skills']
emp = dfEmp[['Employee Name','Employee Number']]
frame = [skill,emp]
df=pd.concat(frame,axis=1)
# In[46]:


df = pd.read_csv("../dataset/employee_table.csv")


# In[47]:


df = df[:samplesize]


# In[48]:


#df['primaryskill'][26]


# In[49]:


def preprocessing(data):
    tmp = " ".join(data.split(','))
    return tmp.lower()


# In[50]:


def predictEmp(data):
    df.dropna(inplace=True)
    trainDF = df['primaryskill']
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
    sortres = processres.sort_values(by=['score'],ascending=False)[2:40] 
    return sortres

