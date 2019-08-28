
# coding: utf-8

# In[4]:


import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys


# In[5]:


def preprocessing(data):
    tmp = " ".join(data.split(','))
    return tmp.lower()


# In[6]:


def predictTechnology(data):
    df = pd.read_csv('dice_com-job_us_sample.csv')
    df['skills'].dropna(inplace=True)
    trainDF = df['skills'][:50]
    testData = data
    print(testData)
    trainDF[0]= testData
    x = trainDF.apply(preprocessing)
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(x)
    #print (tfidf_matrix.shape)
    res = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
    scoreDF = pd.DataFrame(res[0],columns=['score'])
    skillsDF = pd.DataFrame(trainDF)
    frames = [scoreDF, skillsDF]
    result = pd.concat(frames,axis=1)
    return result.sort_values(by=['score'],ascending=False)[2:]    


# In[7]:


#if __name__ == "__main__":
#    main(sys.argv[0])


# In[8]:


#predictTechnology('Java, OSS')


# In[9]:


#'sam'


# In[ ]:




