
# coding: utf-8

# In[80]:


import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import warnings
warnings.filterwarnings('ignore')


# In[81]:


df = pd.read_csv('../dataset/employee_table.csv')


# In[82]:


df = df[['Employee Name','Employee Number','primaryskill','secondary skill','cost','experience']]


# In[83]:


#df.head(2)


# In[84]:


#df.shape


# In[85]:


df.dropna(inplace=True)


# In[86]:


trainDF = df[:290]
testDF= df[290:301]

##Allowed Test Employee
##290    1499902910
##291    1107027358
##292    1101023577
##293    1203032498
##294    1401064670
##295    1303054625
##296    1112030979
##297    1012023185
##298    1201031324
##299    1102024057
##300    1001644719

# In[87]:


def empDeatails(empnumb):
    emp = testDF[testDF['Employee Number'] ==empnumb]
    emp['skill'] = emp[['primaryskill', 'secondary skill']].apply(lambda x: ','.join(x), axis=1)
    return emp


# In[88]:


#empDeatails(1203032498)


# In[89]:


def removedigit(data):
    result = ''.join([i for i in data if not i.isdigit()])
    return result


# In[90]:


def preprocessing(data):
    tmp = " ".join(data.split(','))
    return tmp.lower()


# In[91]:


#trainDF['skill'][0]= empDeatails(1203032498)['skill'].apply(preprocessing)


# In[92]:


def recommendNewTech(inp):
    print(inp)
    data = int(inp)
    trainDF['skill'] = trainDF[['primaryskill', 'secondary skill']].apply(lambda x: ','.join(x), axis=1)    
    
    trainDF['skill'][0] = removedigit(empDeatails(data)['skill'].apply(preprocessing))
    skill = trainDF['skill']
    #print(skill[0])
    s_tfidf_vectorizer = TfidfVectorizer()
    s_tfidf_matrix = s_tfidf_vectorizer.fit_transform(skill)
    s_res = cosine_similarity(s_tfidf_matrix[0:1], s_tfidf_matrix)
    s_scoreDF = pd.DataFrame(s_res[0],columns=['skillscore'])
    
    frames = [s_scoreDF,trainDF]
    result = pd.concat(frames,axis=1)
    
    return result[['skill','skillscore']].sort_values(by=['skillscore'],ascending=False)[2:40]
    
    
    


# In[93]:


#recommendNewTech(1203032498)


# In[ ]:





# In[ ]:




