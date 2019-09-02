
# coding: utf-8

# In[35]:


import pandas as pd


# In[40]:


data = [{'id':1,'name': 'vikash', 'age': 27,'job': 'java,python'}, {'id':2,'name': 'Satyam', 'age': 14,'job': 'python'}]


# In[41]:


path = "../dataset/notification/notification.csv"


# In[42]:


def createNotication(data):
    df = pd.DataFrame.from_dict(data, orient='columns')
    df.to_csv(path)    


# In[43]:


def getNotification(data):
    dfNotification = pd.read_csv(path)
    notires = dfNotification[dfNotification['id'] == int(data)]
    return notires    


# In[44]:


#createNotication(data)


# In[45]:


#getNotification(1)


# In[ ]:




